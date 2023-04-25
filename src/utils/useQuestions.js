const useQuestions = () => {
	const LOCAL_JSON_SERVER = 'http://localhost:5000';
	const DEPLOYED_JSON_SERVER = 'https://quiz-server-vlwu.onrender.com';
	const mockAPI = DEPLOYED_JSON_SERVER;

	const getQuestions = async () => {
		try {
			const res = await fetch(`${mockAPI}/questions`);
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error.message);
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
			console.log(error.message);
		}
	};

	return { getQuestions, createQuestion };
};
export default useQuestions;
