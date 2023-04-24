import React, { useEffect, useState } from 'react';

const QuestionSlide = ({ question }) => {
	const [showAnswer, setShowAnswer] = useState(false);

	useEffect(() => {
		setShowAnswer(false);
	}, [question.question]);

	return (
		<div className="question-slide">
			<p className="question-text">{question.question}</p>
			<button
				className="create-btn"
				onClick={() => setShowAnswer(!showAnswer)}
			>{`${showAnswer ? 'Hide Answer' : 'Show Answer'}`}</button>
			{showAnswer ? <p className="answer-text">{question.answer}</p> : null}
		</div>
	);
};
export default QuestionSlide;
