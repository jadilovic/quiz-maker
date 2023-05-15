import { useEffect, useState } from 'react';

const QuestionSlide = ({ question, questionNumber, totalQuestions }) => {
	const [showAnswer, setShowAnswer] = useState(false);

	useEffect(() => {
		setShowAnswer(false);
	}, [question.question]);

	return (
		<div className="question-slide">
			<h4 className="question-number">
				{`${questionNumber} of ${totalQuestions}`}
			</h4>
			<p className="question-text">{question.question}</p>
			<button
				className="create-btn"
				onClick={() => setShowAnswer(!showAnswer)}
			>{`${showAnswer ? 'Hide Answer' : 'Show Answer'}`}</button>
			{showAnswer && <p className="answer-text">{question.answer}</p>}
		</div>
	);
};

export default QuestionSlide;
