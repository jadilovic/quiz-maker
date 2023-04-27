import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizzes from '../utils/useQuizzes';
import CreateQuizInput from '../components/CreateQuizInput';
const CreateQuiz = () => {
	const navigate = useNavigate();
	const database = useQuizzes();
	const [newQuizName, setNewQuizName] = useState('');
	const [quizzes, setQuizzes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

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

	const defineNewId = () => {
		if (quizzes.length < 1) {
			return 1;
		} else {
			return quizzes[quizzes.length - 1].id + 1;
		}
	};

	const addNewQuizToDatabase = async (quiz) => {
		setIsLoading(true);
		const addedQuiz = await database.createQuiz(quiz);
		if (addedQuiz.error) {
			setError(addedQuiz.error);
		} else {
			navigate(`/edit-quiz/${addedQuiz.id}`);
		}
		setIsLoading(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newQuizName) {
			alert('Please add quiz name');
			return;
		}
		const newQuizId = defineNewId();
		const newQuiz = {
			id: newQuizId,
			name: newQuizName,
			questions: [],
		};
		setError(null);
		addNewQuizToDatabase(newQuiz);
	};

	return (
		<main className="create-quiz">
			<h1 style={{ margin: '1em 0' }}>Create Quiz</h1>
			{isLoading ? (
				<h2 className="notification">Loading...</h2>
			) : (
				<>
					{error ? (
						<h3 className="error-notification">{error}</h3>
					) : (
						<CreateQuizInput
							quizName={newQuizName}
							setQuizName={setNewQuizName}
							handleSubmit={handleSubmit}
							actionName="Create Quiz"
							formName="create-form"
						/>
					)}
				</>
			)}
		</main>
	);
};
export default CreateQuiz;
