import { useEffect, useRef } from 'react';

const CreateQuizInput = ({
	quizName,
	setQuizName,
	handleSubmit,
	actionName,
	formName,
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<form className={formName} onSubmit={handleSubmit}>
			<div className="form-control">
				<label>Quiz Name: </label>
				<input
					ref={inputRef}
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

export default CreateQuizInput;
