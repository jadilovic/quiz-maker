import { useEffect, useState } from 'react';
import useQuestions from '../utils/useQuestions';
const Questions = () => {
	const database = useQuestions();
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getQuestionsFromDatabase = async () => {
		const questionsFromServer = await database.getQuestions();
		setQuestions([...questionsFromServer]);
		setIsLoading(false);
	};

	useEffect(() => {
		getQuestionsFromDatabase();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) return <h2 className="notification">Loading...</h2>;

	return questions.length < 1 ? (
		<h2 className="notification">No questions in the database</h2>
	) : (
		<main className="questions-list">
			<h1 className="page-heading">List of Questions</h1>
			{questions.map((question) => {
				return (
					<div key={question.id} className="question-card">
						<h3>{`Question ID: ${question.id}`}</h3>
						<p className="question-text">{question.question}</p>
						<p className="answer-text">{question.answer}</p>
					</div>
				);
			})}
		</main>
	);
};
export default Questions;
