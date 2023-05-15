import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RemoveModal from './RemoveModal';
import Overlay from '../../components/Overlay';

const QuizQuestions = ({ quiz, updateQuizOnServer, setIsLoading }) => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [questionId, setQuestionId] = useState(null);

	const handleConfirmedRemove = () => {
		const updatedQuestions = quiz.questions.filter(
			(question) => question.id !== questionId
		);
		quiz.questions = updatedQuestions;
		setIsLoading(true);
		updateQuizOnServer(quiz);
		setIsModalOpen(false);
	};

	const handleRemove = (questionId) => {
		setQuestionId(questionId);
		setIsModalOpen(true);
	};

	if (quiz.questions.length < 1) return <h3>No questions added to the quiz</h3>;
	return (
		<div className="questions-container">
			<h3>Quiz questions:</h3>
			{quiz.questions.map((question) => {
				return (
					<div className="question-answer" key={question.id}>
						<div className="description">
							<p className="p-question">{question.question}</p>
							<p className="p-answer">{question.answer}</p>
						</div>
						<button
							className="remove-button"
							onClick={() => handleRemove(question.id)}
						>
							Remove
						</button>
					</div>
				);
			})}
			<button
				onClick={() => navigate(`/quizzes/${quiz.id}`)}
				className="create-btn"
				style={{ margin: 0, minWidth: '18em' }}
			>
				Start Quiz
			</button>
			<RemoveModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				handleConfirmedRemove={handleConfirmedRemove}
			/>
			<Overlay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</div>
	);
};
export default QuizQuestions;
