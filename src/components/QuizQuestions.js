const QuizQuestions = ({ quiz }) => {
	if (quiz.questions.length < 1) return <h3>No questions added to the quiz</h3>;
	return (
		<div className="questions-container">
			{quiz.questions.map((question) => {
				return (
					<div className="question-answer" key={question.id}>
						<p className="p-question">{question.question}</p>
						<p className="p-answer">{question.answer}</p>
					</div>
				);
			})}
		</div>
	);
};
export default QuizQuestions;
