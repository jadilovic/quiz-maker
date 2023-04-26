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
		} else {
			setQuizzes(quizzesFromServer);
		}
		setIsLoading(false);
	};

	const handleEdit = (e, id) => {
		e.stopPropagation();
		navigate(`/edit-quiz/${id}`);
	};

	const handleConfirmedDelete = async () => {
		setIsLoading(true);
		const isDeleted = await database.deleteQuiz(quizId);
		console.log(isDeleted);
		if (!isDeleted.error && isDeleted) {
			setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
		} else {
			setDeleteError('Error Deleting Quiz');
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

	const makeQuizReactElement = () => {
		return (
			<button onClick={() => navigate('/create-quiz')} className="question-btn">
				Make New Quiz
			</button>
		);
	};

	return (
		<main>
			<h1 className="page-heading">Quizzes</h1>
			{isLoading && <h2 className="notification">Loading...</h2>}
			{error && <h3 className="error-notification">{error}</h3>}
			{deleteError && <h3 className="error-notification">{deleteError}</h3>}
			{quizzes.length < 1 ? (
				<>
					<h2 className="notification">No quizzes have been created yet!</h2>
					{makeQuizReactElement()}
				</>
			) : (
				<div className="quizzes-container">
					{makeQuizReactElement()}
					<table>
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
			)}
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
