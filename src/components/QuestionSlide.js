import React, { useEffect, useState } from 'react';

const QuestionSlide = ({ question }) => {
	const [showAnswer, setShowAnswer] = useState(false);

	useEffect(() => {
		setShowAnswer(false);
	}, [question.question]);

	return (
		<>
			<h3>{question.question}</h3>
			<button onClick={() => setShowAnswer(!showAnswer)}>{`${
				showAnswer ? 'Hide Answer' : 'Show Answer'
			}`}</button>
			{showAnswer ? <p>{question.answer}</p> : null}
		</>
	);
};
export default QuestionSlide;
