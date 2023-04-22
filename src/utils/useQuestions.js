const useQuestions = () => {
	const getQuestions = async () => {
		try {
			const res = await fetch('http://localhost:5000/questions');
			const data = await res.json();
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};

	const createQuestion = async (question) => {
		try {
			const res = await fetch('http://localhost:5000/questions', {
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
