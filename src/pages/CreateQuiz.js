import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizzes from '../utils/useQuizzes';
import QuizNameInput from '../components/QuizNameInput';
const CreateQuiz = () => {
	const navigate = useNavigate();
	const database = useQuizzes();
	const [newQuizName, setNewQuizName] = useState('');
	const [quizzes, setQuizzes] = useState([]);

	useEffect(() => {
		getQuizzesFromServer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quizzes]);

	const getQuizzesFromServer = async () => {
		const quizzesFromServer = await database.getQuizzes();
		setQuizzes(quizzesFromServer);
	};

	const defineNewId = () => {
		if (quizzes.length < 1) {
			return 1;
		} else {
			return quizzes[quizzes.length - 1].id + 1;
		}
	};

	const addNewQuizToDatabase = async (quiz) => {
		const addedQuiz = await database.createQuiz(quiz);
		console.log(addedQuiz);
		if (addedQuiz) navigate(`/edit-quiz/${addedQuiz.id}`);
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
		addNewQuizToDatabase(newQuiz);
	};

	return (
		<main className="create-quiz">
			<h1>Create Quiz</h1>
			<QuizNameInput
				quizName={newQuizName}
				setQuizName={setNewQuizName}
				handleSubmit={handleSubmit}
				actionName="Create Quiz"
				formName="create-form"
			/>
		</main>
	);
};
export default CreateQuiz;
