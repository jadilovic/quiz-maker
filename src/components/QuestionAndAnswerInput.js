import React, { useState } from 'react';
import useQuestions from '../utils/useQuestions';

const QuestionAndAnswerInput = ({
	quiz,
	updateQuizInDatabase,
	setShowQuestionAndAnswerInput,
}) => {
	const database = useQuestions();
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');

	const handleQuestionChange = (event) => {
		setQuestion(event.target.value);
	};

	const handleAnswerChange = (event) => {
		setAnswer(event.target.value);
	};

	const defineNewQuestionId = async () => {
		const serverQuestions = await database.getQuestions();
		if (serverQuestions.length < 1) {
			return 1;
		} else {
			return serverQuestions[serverQuestions.length - 1].id + 1;
		}
	};

	const addQuestionToDatabase = async (newQuestionAndAnswer) => {
		const questionFromDatabase = await database.createQuestion(
			newQuestionAndAnswer
		);
		quiz.questions.push(questionFromDatabase);
		updateQuizInDatabase(quiz);
	};

	const handleCreateQuestionAndAnswer = async (e) => {
		e.preventDefault();
		if (!question || !answer) {
			alert('Please add question or answer');
			return;
		}
		const newQuestionId = await defineNewQuestionId();
		const newQuestion = {
			id: newQuestionId,
			question: question,
			answer: answer,
		};
		setQuestion('');
		setAnswer('');
		addQuestionToDatabase(newQuestion);
		setShowQuestionAndAnswerInput(false);
	};

	return (
		<div className="q-a-input">
			<h2>Question and Answer Input</h2>
			<label htmlFor="question">Question:</label>
			<br />
			<textarea
				id="question"
				value={question}
				onChange={handleQuestionChange}
			/>
			<label htmlFor="answer">Answer:</label>
			<textarea id="answer" value={answer} onChange={handleAnswerChange} />
			<button onClick={handleCreateQuestionAndAnswer}>Create Q and A</button>
			<button onClick={() => setShowQuestionAndAnswerInput(false)}>
				Cancel
			</button>
		</div>
	);
};
export default QuestionAndAnswerInput;
