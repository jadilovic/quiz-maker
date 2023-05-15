import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuizzes from '../../hooks/useQuizzes';
import useQuestions from '../../hooks/useQuestions';
import EditQuizNameInput from './EditQuizNameInput';
import QuestionsSelection from './QuestionsSelection';
import QuizQuestions from './QuizQuestions';
import QuestionAndAnswerInput from './QuestionAndAnswerInput';

const EditQuiz = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const databaseQuizzes = useQuizzes();
	const databaseQuestions = useQuestions();
	const [quiz, setQuiz] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState([]);
	const [serverQuestions, setServerQuestions] = useState([]);
	const [showQuestionAndAnswerInput, setShowQuestionAndAnswerInput] =
		useState(false);
	const [showQuestionsSelection, setShowQuestionsSelection] = useState(false);
	const questionsEndRef = useRef(null);

	useEffect(() => {
		getQuizFromServer(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getQuestionsFromServer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quiz]);

	useEffect(() => {
		scrollToBottom();
	}, [showQuestionAndAnswerInput, showQuestionsSelection]);

	const scrollToBottom = () => {
		questionsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const getQuestionsFromServer = async () => {
		const questionsFromServer = await databaseQuestions.getQuestions();
		if (questionsFromServer.error) {
			setErrors([...errors, questionsFromServer.error]);
		} else {
			const availableQuestionIds = questionsFromServer.map((item) => item.id);
			const includedQuestionIds = quiz.questions?.map((item) => item.id);
			const questionIdsToDisplay = availableQuestionIds.filter(
				(questionId) => !includedQuestionIds?.includes(questionId)
			);
			const questionsToDisplay = questionsFromServer.filter((question) => {
				return questionIdsToDisplay.includes(question.id);
			});
			setServerQuestions([...questionsToDisplay]);
		}
		setIsLoading(false);
	};

	const getQuizFromServer = async (quizId) => {
		setIsLoading(true);
		const quizFromServer = await databaseQuizzes.getQuiz(quizId);
		if (Object.keys(quizFromServer).length < 1) {
			navigate('/');
		} else if (quizFromServer.error) {
			setErrors([...errors, quizFromServer.error]);
			setIsLoading(false);
		} else {
			setQuiz(quizFromServer);
		}
	};

	const updateQuizOnServer = async (updatedQuiz) => {
		const updatedQuizOnTheServer = await databaseQuizzes.updateQuiz(
			updatedQuiz
		);
		if (updatedQuizOnTheServer.error) {
			setErrors([...errors, updatedQuizOnTheServer.error]);
			setIsLoading(false);
		} else {
			// getQuizFromServer(updatedQuizOnTheServer.id);
			setQuiz(updatedQuizOnTheServer);
		}
	};

	if (isLoading) return <h2 className="notification">Loading...</h2>;
	return (
		<main style={{ paddingBottom: '4em' }}>
			<h1 className="page-heading">Edit Quiz - {quiz?.name}</h1>
			{errors.length > 0 || !quiz.name ? (
				errors.map((error, index) => {
					return (
						<h3 key={index} className="error-notification">
							{error}
						</h3>
					);
				})
			) : (
				<>
					<EditQuizNameInput
						setIsLoading={setIsLoading}
						quiz={quiz}
						updateQuizOnServer={updateQuizOnServer}
					/>
					<QuizQuestions
						quiz={quiz}
						updateQuizOnServer={updateQuizOnServer}
						setIsLoading={setIsLoading}
					/>
					{!showQuestionAndAnswerInput && !showQuestionsSelection ? (
						<div className="edit-btns">
							<button
								className="question-btn"
								onClick={() => setShowQuestionAndAnswerInput(true)}
							>
								Create New Question
							</button>
							<button
								className="question-btn"
								onClick={() => setShowQuestionsSelection(true)}
							>
								Add Questions From Database
							</button>
						</div>
					) : null}
					{showQuestionAndAnswerInput ? (
						<QuestionAndAnswerInput
							setIsLoading={setIsLoading}
							quiz={quiz}
							updateQuizOnServer={updateQuizOnServer}
							setShowQuestionAndAnswerInput={setShowQuestionAndAnswerInput}
							errors={errors}
							setErrors={setErrors}
						/>
					) : null}
					{showQuestionsSelection ? (
						<QuestionsSelection
							setIsLoading={setIsLoading}
							quiz={quiz}
							updateQuizOnServer={updateQuizOnServer}
							serverQuestions={serverQuestions}
							setShowQuestionsSelection={setShowQuestionsSelection}
						/>
					) : null}
					<div ref={questionsEndRef} />
				</>
			)}
		</main>
	);
};

export default EditQuiz;
