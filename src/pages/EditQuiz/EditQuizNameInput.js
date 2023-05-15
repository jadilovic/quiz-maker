import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

const EditQuizNameInput = ({ setIsLoading, quiz, updateQuizOnServer }) => {
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
		setIsLoading(true);
		updateQuizOnServer(quiz);
	};

	return (
		<form className="edit-form" onSubmit={handleSubmit}>
			<div className="form-control">
				<label>Quiz Name: </label>
				<input
					type="text"
					placeholder="Enter new quiz name"
					value={editedQuizName}
					onChange={(e) => setEditedQuizName(e.target.value)}
				/>
			</div>

			<input type="submit" value="Edit Quiz Name" className="create-btn" />
		</form>
	);
};

EditQuizNameInput.propTypes = {
	setIsLoading: PropTypes.func,
	quiz: PropTypes.object,
	updateQuizOnServer: PropTypes.func,
};

export default EditQuizNameInput;
