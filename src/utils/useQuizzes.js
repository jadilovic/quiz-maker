const useQuizzes = () => {
	const getQuizzes = async () => {
		try {
			const res = await fetch('http://localhost:5000/quizzes');
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};

	const getQuiz = async (quizId) => {
		try {
			const res = await fetch(`http://localhost:5000/quizzes/${quizId}`);
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};

	const createQuiz = async (quiz) => {
		try {
			const res = await fetch('http://localhost:5000/quizzes', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(quiz),
			});
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};

	const updateQuiz = async (quizToUpdate) => {
		const res = await fetch(
			`http://localhost:5000/quizzes/${quizToUpdate.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(quizToUpdate),
			}
		);

		const data = await res.json();
		return data;
	};

	const deleteQuiz = async (id) => {
		try {
			const res = await fetch(`http://localhost:5000/quizzes/${id}`, {
				method: 'DELETE',
			});
			return res.status === 200;
		} catch (error) {
			console.log(error.message);
		}
	};

	return { getQuizzes, getQuiz, createQuiz, updateQuiz, deleteQuiz };
};

export default useQuizzes;
