import { useState } from 'react';

const QuestionsSelection = ({
	setIsLoading,
	quiz,
	updateQuizOnServer,
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
		quiz.questions = [...quiz.questions, ...selectedQuestions];
		setIsLoading(true);
		updateQuizOnServer(quiz);
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
			<div style={{ padding: '0 1em' }} className="q-a-input-btns">
				<button className="create-btn" onClick={handleSelectedQuestions}>
					Add selected questions
				</button>
				<button
					className="question-btn"
					onClick={() => setShowQuestionsSelection(false)}
				>
					Cancel
				</button>
			</div>
		</>
	);
};

export default QuestionsSelection;
