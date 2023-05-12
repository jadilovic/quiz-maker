const useQuestions = () => {
	const mockAPI = process.env.REACT_APP_DEPLOYED_JSON_SERVER;

	const getQuestions = async () => {
		try {
			const res = await fetch(`${mockAPI}/questions`);
			const data = await res.json();
			return data;
		} catch (error) {
			return { error: `${error.message} questions` };
		}
	};

	const createQuestion = async (question) => {
		try {
			const res = await fetch(`${mockAPI}/questions`, {
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
