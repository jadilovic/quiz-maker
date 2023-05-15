import { useState } from 'react';
import { PropTypes } from 'prop-types';
import useQuestions from '../../hooks/useQuestions';

const QuestionAndAnswerInput = ({
	setIsLoading,
	quiz,
	updateQuizOnServer,
	setShowQuestionAndAnswerInput,
	errors,
	setErrors,
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
		if (serverQuestions.error) {
			setErrors([...errors, serverQuestions.error]);
		} else {
			return serverQuestions.length < 1
				? 1
				: serverQuestions[serverQuestions.length - 1].id + 1;
		}
	};

	const addQuestionToDatabase = async (newQuestionAndAnswer) => {
		const questionFromDatabase = await database.createQuestion(
			newQuestionAndAnswer
		);
		if (questionFromDatabase.error) {
			setErrors([...errors, questionFromDatabase.error]);
		} else {
			quiz.questions.push(questionFromDatabase);
			updateQuizOnServer(quiz);
		}
	};

	const handleCreateQuestionAndAnswer = async (e) => {
		e.preventDefault();
		if (!question || !answer) {
			alert('Please add question or answer');
			return;
		}
		setIsLoading(true);
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
			<h3>Question and Answer Input</h3>
			<label htmlFor="question">Question:</label>
			<textarea
				placeholder="Enter question"
				id="question"
				value={question}
				onChange={handleQuestionChange}
			/>
			<br />
			<label htmlFor="answer">Answer:</label>
			<textarea
				placeholder="Enter answer"
				id="answer"
				value={answer}
				onChange={handleAnswerChange}
			/>
			<br />
			<div className="q-a-input-btns">
				<button className="create-btn" onClick={handleCreateQuestionAndAnswer}>
					Create Q and A
				</button>
				<button
					className="question-btn"
					onClick={() => setShowQuestionAndAnswerInput(false)}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

QuestionAndAnswerInput.propTypes = {
	setIsLoading: PropTypes.func,
	quiz: PropTypes.object,
	updateQuizOnServer: PropTypes.func,
	setShowQuestionAndAnswerInput: PropTypes.func,
	errors: PropTypes.array,
	setErrors: PropTypes.func,
};

export default QuestionAndAnswerInput;
