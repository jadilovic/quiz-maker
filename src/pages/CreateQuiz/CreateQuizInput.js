import { useEffect, useRef } from 'react';

const CreateQuizInput = ({ quizName, setQuizName, handleSubmit }) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<form className="create-form" onSubmit={handleSubmit}>
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

			<input type="submit" value="Create Quiz" className="create-btn" />
		</form>
	);
};

export default CreateQuizInput;
