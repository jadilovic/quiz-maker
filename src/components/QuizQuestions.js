const QuizQuestions = ({ quiz, updateQuizInDatabase }) => {
	const handleRemove = (questionId) => {
		const updatedQuestions = quiz.questions.filter(
			(question) => question.id !== questionId
		);
		quiz.questions = updatedQuestions;
		updateQuizInDatabase(quiz);
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
		</div>
	);
};
export default QuizQuestions;
