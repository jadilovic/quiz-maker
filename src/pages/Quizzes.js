import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizzes from '../utils/useQuizzes';
import DeleteModal from '../components/DeleteModal';
import Overlay from '../components/Overlay';

const Quizzes = () => {
	const navigate = useNavigate();
	const database = useQuizzes();
	const [quizzes, setQuizzes] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [quizId, setQuizId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [deleteError, setDeleteError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		getQuizzesFromServer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getQuizzesFromServer = async () => {
		const quizzesFromServer = await database.getQuizzes();
		if (quizzesFromServer.error) {
			setError(`Error: ${quizzesFromServer.error}`);
			return;
		}
		setQuizzes(quizzesFromServer);
		setIsLoading(false);
	};

	const handleEdit = (e, id) => {
		e.stopPropagation();
		navigate(`/edit-quiz/${id}`);
	};

	const handleConfirmedDelete = async () => {
		setIsLoading(true);
		const isDeleted = await database.deleteQuiz(quizId);
		if (!isDeleted.error) {
			setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
		} else {
			setDeleteError(`Error Deleting Quiz: ${isDeleted.error}`);
		}
		setIsModalOpen(false);
		setIsLoading(false);
	};

	const handleDelete = (e, id) => {
		e.stopPropagation();
		setQuizId(id);
		setIsModalOpen(true);
	};

	const startQuiz = (quizId) => {
		navigate(`/quizzes/${quizId}`);
	};

	if (error) return <h2 className="notification">{error}</h2>;
	if (isLoading) return <h2 className="notification">Loading...</h2>;

	if (quizzes.length < 1)
		return <h2 className="notification">No quizzes have been created yet!</h2>;

	console.log(quizzes);
	console.log(error);
	console.log(deleteError);

	return (
		<main>
			<h1 className="page-heading">List of Quizzes</h1>
			{deleteError && <h3>{deleteError}</h3>}
			<div className="quizzes-container">
				<button
					onClick={() => navigate('/create-quiz')}
					className="question-btn"
				>
					Make New Quiz
				</button>
				<table
					style={{
						width: '100%',
						maxWidth: '40em',
						padding: '0 1em',
						margin: '2em 0 4em 0',
					}}
				>
					<thead>
						<tr>
							<th>Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{quizzes.map((item, index) => (
							<tr
								style={{
									backgroundColor: `${
										index % 2 ? 'rgb(180, 179, 179)' : 'lightgrey'
									}`,
								}}
								key={item.id}
								onClick={() => startQuiz(item.id)}
							>
								<td>{item.name}</td>
								<td>
									<button
										className="create-btn"
										style={{
											minWidth: '5em',
											margin: '0.3em',
											height: '2.5em',
											width: '40%',
										}}
										onClick={(e) => handleEdit(e, item.id)}
									>
										Edit
									</button>
									<button
										className="remove-button"
										style={{
											minWidth: '5em',
											margin: '0.3em',
											height: '2.5em',
											width: '40%',
										}}
										onClick={(e) => handleDelete(e, item.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<DeleteModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				handleConfirmedDelete={handleConfirmedDelete}
			/>
			<Overlay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</main>
	);
};
export default Quizzes;
