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

	useEffect(() => {
		getQuizzesFromServer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quizzes]);

	const getQuizzesFromServer = async () => {
		const quizzesFromServer = await database.getQuizzes();
		setQuizzes(quizzesFromServer);
	};

	const handleEdit = (e, id) => {
		e.stopPropagation();
		navigate(`/edit-quiz/${id}`);
		console.log(`Edit button clicked for id ${id}`);
	};

	const handleConfirmedDelete = async () => {
		const isDeleted = await database.deleteQuiz(quizId);
		if (isDeleted) {
			setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
			setIsModalOpen(false);
		} else {
			alert('Error Deleting This Quiz');
		}
		console.log(`Delete button clicked for id ${quizId}`);
	};

	const handleDelete = (e, id) => {
		e.stopPropagation();
		setQuizId(id);
		setIsModalOpen(true);
	};

	const startQuiz = (quizId) => {
		navigate(`/quizzes/${quizId}`);
	};

	if (quizzes.length < 1) return <div>No quizzes have been created yet!</div>;

	return (
		<main className="quizzes-container">
			<h1 style={{ margin: '1em 0' }}>List of Quizzes</h1>
			<table
				style={{
					width: '100%',
					maxWidth: '40em',
					padding: '0 1em',
					marginBottom: '4em',
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
