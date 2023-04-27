import React, { useState, useEffect } from 'react';

const QuizNameInput = ({ quiz, updateQuizOnServer, actionName, formName }) => {
	const [editedQuizName, setEditedQuizName] = useState('');

	useEffect(() => {
		setEditedQuizName(quiz?.name);
	}, [quiz]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!editedQuizName) {
			alert('Please add quiz name');
			return;
		}
		quiz.name = editedQuizName;
		updateQuizOnServer(quiz);
	};

	return (
		<form className={formName} onSubmit={handleSubmit}>
			<div className="form-control">
				<label>Quiz Name: </label>
				<input
					type="text"
					placeholder="Enter new quiz name"
					value={editedQuizName}
					onChange={(e) => setEditedQuizName(e.target.value)}
				/>
			</div>

			<input type="submit" value={actionName} className="create-btn" />
		</form>
	);
};

export default QuizNameInput;
