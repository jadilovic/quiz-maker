import React, { useState } from 'react';

const QuestionsSelection = ({
	quiz,
	updateQuizInDatabase,
	serverQuestions,
	setShowQuestionsSelection,
}) => {
	const [selectedQuestionsIds, setSelectedQuestionsIds] = useState([]);

	function handleQuestionSelection(event) {
		const questionId = parseInt(event.target.value);
		const isChecked = event.target.checked;

		if (isChecked) {
			setSelectedQuestionsIds([...selectedQuestionsIds, questionId]);
		} else {
			setSelectedQuestionsIds(
				selectedQuestionsIds.filter((id) => id !== questionId)
			);
		}
	}

	const handleSelectedQuestions = () => {
		const selectedQuestions = serverQuestions.filter((question) =>
			selectedQuestionsIds.includes(question.id)
		);
		console.log(quiz);
		quiz.questions = [...quiz.questions, ...selectedQuestions];
		updateQuizInDatabase(quiz);
		setShowQuestionsSelection(false);
	};

	return (
		<>
			<br />
			<h3>Questions for selection</h3>
			<ul className="questions-selection">
				{serverQuestions.map((question) => (
					<li key={question.id}>
						<label>
							<input
								type="checkbox"
								value={question.id}
								checked={selectedQuestionsIds.includes(question.id)}
								onChange={handleQuestionSelection}
							/>
							{question.question}
						</label>
					</li>
				))}
			</ul>
			<button onClick={handleSelectedQuestions}>Add selected questions</button>
			<button onClick={() => setShowQuestionsSelection(false)}>Cancel</button>
		</>
	);
};
export default QuestionsSelection;
