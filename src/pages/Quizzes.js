import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizzes from '../utils/useQuizzes';
import DeleteModal from '../components/DeleteModal';
import Overlay from '../components/Overlay';
import QuizzesTable from '../components/QuizzesTable';

const Quizzes = () => {
	const navigate = useNavigate();
	const database = useQuizzes();
	const [quizzes, setQuizzes] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [quizId, setQuizId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		getQuizzesFromServer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getQuizzesFromServer = async () => {
		setIsLoading(true);
		const quizzesFromServer = await database.getQuizzes();
		if (quizzesFromServer.error) {
			setErrors([...errors, quizzesFromServer.error]);
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
		if (isDeleted) {
			setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
		} else {
			setErrors([...errors, isDeleted.error]);
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

	const makeQuizButton = () => {
		return (
			<button onClick={() => navigate('/create-quiz')} className="question-btn">
				Make New Quiz
			</button>
		);
	};

	if (isLoading)
		return (
			<>
				<h1 className="page-heading">Quizzes</h1>
				{isLoading && <h2 className="notification">Loading...</h2>}
			</>
		);
	return (
		<main>
			<h1 className="page-heading">Quizzes</h1>
			{errors.length > 0 ? (
				errors.map((error, index) => {
					return (
						<h3 key={index} className="error-notification">
							{error}
						</h3>
					);
				})
			) : (
				<>
					{quizzes.length < 1 ? (
						<>
							<h2 className="notification">
								No quizzes have been created yet!
							</h2>
							{makeQuizButton()}
						</>
					) : (
						<div className="quizzes-container">
							{makeQuizButton()}
							<QuizzesTable
								quizzes={quizzes}
								startQuiz={startQuiz}
								handleEdit={handleEdit}
								handleDelete={handleDelete}
							/>
						</div>
					)}
				</>
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
