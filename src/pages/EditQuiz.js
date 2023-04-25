import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuizzes from '../utils/useQuizzes';
import useQuestions from '../utils/useQuestions';
import QuizNameInput from '../components/QuizNameInput';
import QuestionsSelection from '../components/QuestionsSelection';
import QuizQuestions from '../components/QuizQuestions';
import QuestionAndAnswerInput from '../components/QuestionAndAnswerInput';

const EditQuiz = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const databaseQuizzes = useQuizzes();
	const databaseQuestions = useQuestions();
	const [quiz, setQuiz] = useState({});
	const [editedQuizName, setEditedQuizName] = useState('');
	const [serverQuestions, setServerQuestions] = useState([]);
	const [showQuestionAndAnswerInput, setShowQuestionAndAnswerInput] =
		useState(false);
	const [showQuestionsSelection, setShowQuestionsSelection] = useState(false);
	const questionsEndRef = useRef(null);

	const scrollToBottom = () => {
		questionsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const getQuestionsFromServer = async () => {
		const questionsFromServer = await databaseQuestions.getQuestions();
		const availableQuestionIds = questionsFromServer.map((item) => item.id);
		const includedQuestionIds = quiz.questions?.map((item) => item.id);
		const questionIdsToDisplay = availableQuestionIds.filter(
			(avlQue) => !includedQuestionIds?.includes(avlQue)
		);
		const questionsToDisplay = questionsFromServer.filter((question) => {
			return questionIdsToDisplay.includes(question.id);
		});
		setServerQuestions([...questionsToDisplay]);
	};

	const getQuizFromServer = async (quizId) => {
		const quizFromServer = await databaseQuizzes.getQuiz(quizId);
		if (Object.keys(quizFromServer).length < 1) navigate('/');
		setQuiz(quizFromServer);
		setEditedQuizName(quizFromServer.name);
	};

	const updateQuizInDatabase = async (updatedQuiz) => {
		const updatedQuizInDatabase = await databaseQuizzes.updateQuiz(updatedQuiz);
		getQuizFromServer(updatedQuizInDatabase.id);
	};

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

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!editedQuizName) {
			alert('Please add quiz name');
			return;
		}
		quiz.name = editedQuizName;
		updateQuizInDatabase(quiz);
	};

	if (Object.keys(quiz).length < 1) return <h1>Loading...</h1>;
	return (
		<main style={{ paddingBottom: '4em' }}>
			<h1 className="page-heading">Edit Quiz - {quiz.name}</h1>
			<QuizNameInput
				quizName={editedQuizName}
				setQuizName={setEditedQuizName}
				handleSubmit={handleSubmit}
				actionName="Edit Quiz Name"
				formName="edit-form"
			/>
			<QuizQuestions quiz={quiz} updateQuizInDatabase={updateQuizInDatabase} />
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
					quiz={quiz}
					updateQuizInDatabase={updateQuizInDatabase}
					setShowQuestionAndAnswerInput={setShowQuestionAndAnswerInput}
				/>
			) : null}
			{showQuestionsSelection ? (
				<QuestionsSelection
					quiz={quiz}
					updateQuizInDatabase={updateQuizInDatabase}
					serverQuestions={serverQuestions}
					setShowQuestionsSelection={setShowQuestionsSelection}
				/>
			) : null}
			<div ref={questionsEndRef} />
		</main>
	);
};
export default EditQuiz;
