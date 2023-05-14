import useServer from './useServer';

const useQuizzes = () => {
	const database = useServer();

	const getQuizzes = async () => {
		try {
			console.log(`${database.mockAPI}/quizzes`);
			const res = await fetch(`${database.mockAPI}/quizzes`);
			const data = await res.json();
			return data;
		} catch (error) {
			return { error: `${error.message} quizzes` };
		}
	};

	const getQuiz = async (quizId) => {
		try {
			const res = await fetch(`${database.mockAPI}/quizzes/${quizId}`);
			const data = await res.json();
			return data;
		} catch (error) {
			return { error: `${error.message} quiz` };
		}
	};

	const createQuiz = async (quiz) => {
		try {
			const res = await fetch(`${database.mockAPI}/quizzes`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(quiz),
			});
			const data = await res.json();
			return data;
		} catch (error) {
			return { error: `${error.message} to create new quiz` };
		}
	};

	const updateQuiz = async (quizToUpdate) => {
		try {
			const res = await fetch(
				`${database.mockAPI}/quizzes/${quizToUpdate.id}`,
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
		} catch (error) {
			return { error: `${error.message} to update quiz` };
		}
	};

	const deleteQuiz = async (id) => {
		try {
			const res = await fetch(`${database.mockAPI}/quizzes/${id}`, {
				method: 'DELETE',
			});
			return res.status === 200;
		} catch (error) {
			return { error: `${error.message} to delete quiz` };
		}
	};

	return { getQuizzes, getQuiz, createQuiz, updateQuiz, deleteQuiz };
};

export default useQuizzes;
