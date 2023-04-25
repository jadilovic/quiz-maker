const useQuizzes = () => {
	const LOCAL_JSON_SERVER = 'http://localhost:5000';
	const DEPLOYED_JSON_SERVER = 'https://quiz-server-vlwu.onrender.com';
	const mockAPI = DEPLOYED_JSON_SERVER;

	const getQuizzes = async () => {
		try {
			const res = await fetch(`${mockAPI}/quizzes`);
			const data = await res.json();
			return data;
		} catch (error) {
			return { error: error.message };
		}
	};

	const getQuiz = async (quizId) => {
		try {
			const res = await fetch(`${mockAPI}/quizzes/${quizId}`);
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};

	const createQuiz = async (quiz) => {
		try {
			const res = await fetch(`${mockAPI}/quizzes`, {
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
		const res = await fetch(`${mockAPI}/quizzes/${quizToUpdate.id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(quizToUpdate),
		});

		const data = await res.json();
		return data;
	};

	const deleteQuiz = async (id) => {
		try {
			const res = await fetch(`${mockAPI}/quizzes/${id}`, {
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
