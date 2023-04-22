import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizzes from '../utils/useQuizzes';

const Quizzes = () => {
	const navigate = useNavigate();
	const database = useQuizzes();
	const [quizzes, setQuizzes] = useState([]);

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

	const handleDelete = async (e, id) => {
		e.stopPropagation();
		const isDeleted = await database.deleteQuiz(id);
		if (isDeleted) {
			setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
		} else {
			alert('Error Deleting This Quiz');
		}
		console.log(`Delete button clicked for id ${id}`);
	};

	const startQuiz = (quizId) => {
		navigate(`/quizzes/${quizId}`);
	};

	if (quizzes.length < 1) return <div>No quizzes have been created yet!</div>;

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{quizzes.map((item) => (
					<tr key={item.id} onClick={() => startQuiz(item.id)}>
						<td>{item.name}</td>
						<td>
							<button onClick={(e) => handleEdit(e, item.id)}>Edit</button>
							<button onClick={(e) => handleDelete(e, item.id)}>Delete</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default Quizzes;
