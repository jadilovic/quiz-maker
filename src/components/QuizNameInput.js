const QuizNameInput = ({
	quizName,
	setQuizName,
	handleSubmit,
	actionName,
	formName,
}) => {
	return (
		<form className={formName} onSubmit={handleSubmit}>
			<div className="form-control">
				<label>Quiz Name: </label>
				<input
					type="text"
					placeholder="Enter new quiz name"
					value={quizName}
					onChange={(e) => setQuizName(e.target.value)}
				/>
			</div>

			<input type="submit" value={actionName} className="create-btn" />
		</form>
	);
};

export default QuizNameInput;
