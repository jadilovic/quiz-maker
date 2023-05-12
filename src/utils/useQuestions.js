import useServer from './useServer';

const useQuestions = () => {
	const database = useServer();

	const getQuestions = async () => {
		try {
			const res = await fetch(`${database.mockAPI}/questions`);
			const data = await res.json();
			return data;
		} catch (error) {
			return { error: `${error.message} questions` };
		}
	};

	const createQuestion = async (question) => {
		try {
			const res = await fetch(`${database.mockAPI}/questions`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(question),
			});
			const data = await res.json();
			return data;
		} catch (error) {
			return { error: `${error.message} to create new question` };
		}
	};

	return { getQuestions, createQuestion };
};
export default useQuestions;
