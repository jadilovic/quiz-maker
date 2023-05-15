import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizzes from '../../hooks/useQuizzes';
import CreateQuizInput from './CreateQuizInput';

const CreateQuiz = () => {
	const navigate = useNavigate();
	const database = useQuizzes();
	const [newQuizName, setNewQuizName] = useState('');
	const [quizzes, setQuizzes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getQuizzesFromServer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getQuizzesFromServer = async () => {
		setIsLoading(true);
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
						/>
					)}
				</>
			)}
		</main>
	);
};

export default CreateQuiz;
