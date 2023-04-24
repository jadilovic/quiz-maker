const useQuizzes = () => {
	const getQuizzes = async () => {
		try {
			const res = await fetch('https://quiz-server-vlwu.onrender.com/quizzes');
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};

	const getQuiz = async (quizId) => {
		try {
			const res = await fetch(
				`https://quiz-server-vlwu.onrender.com/quizzes/${quizId}`
			);
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};

	const createQuiz = async (quiz) => {
		try {
			const res = await fetch('https://quiz-server-vlwu.onrender.com/quizzes', {
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
			`https://quiz-server-vlwu.onrender.com/quizzes/${quizToUpdate.id}`,
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
			const res = await fetch(
				`https://quiz-server-vlwu.onrender.com/quizzes/${id}`,
				{
					method: 'DELETE',
				}
			);
			return res.status === 200;
		} catch (error) {
			console.log(error.message);
		}
	};

	return { getQuizzes, getQuiz, createQuiz, updateQuiz, deleteQuiz };
};

export default useQuizzes;
