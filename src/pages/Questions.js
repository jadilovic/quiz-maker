import { useEffect, useState } from 'react';
import useQuestions from '../hooks/useQuestions';

const Questions = () => {
	const database = useQuestions();
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getQuestionsFromDatabase();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getQuestionsFromDatabase = async () => {
		setIsLoading(true);
		const questionsFromServer = await database.getQuestions();
		if (questionsFromServer.error) {
			setError(`Error: ${questionsFromServer.error}`);
		} else {
			setQuestions([...questionsFromServer]);
		}
		setIsLoading(false);
	};

	return (
		<main className="questions-list">
			<h1 className="page-heading">Questions</h1>
			{isLoading ? (
				<h2 className="notification">Loading...</h2>
			) : (
				<>
					{error && <h3 className="error-notification">{error}</h3>}
					{questions.length < 1 && !error ? (
						<h2 className="notification">No questions in the database</h2>
					) : (
						questions.map((question) => {
							return (
								<div key={question.id} className="question-card">
									<h3>{`Question ID: ${question.id}`}</h3>
									<p className="question-text">{question.question}</p>
									<p className="answer-text">{question.answer}</p>
								</div>
							);
						})
					)}
				</>
			)}
		</main>
	);
};

export default Questions;
