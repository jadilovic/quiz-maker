import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import useQuizzes from '../utils/useQuizzes';
import QuestionSlide from '../components/QuestionSlide';

const Quiz = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const database = useQuizzes();
	const [quiz, setQuiz] = useState({});
	const [currentSlide, setCurrentSlide] = useState(0);
	const handlers = useSwipeable({
		onSwiped: (eventData) => console.log('User Swiped!', eventData),
		onSwipedLeft: () => nextSlide(),
		onSwipedRight: () => previousSlide(),
	});

	const getQuizFromServer = async (quizId) => {
		const quizFromServer = await database.getQuiz(quizId);
		if (Object.keys(quizFromServer).length < 1) navigate('/');
		setQuiz(quizFromServer);
	};

	useEffect(() => {
		getQuizFromServer(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function nextSlide() {
		if (currentSlide === quiz.questions.length - 1) {
			setCurrentSlide(0);
		} else {
			setCurrentSlide(currentSlide + 1);
		}
	}

	function previousSlide() {
		if (currentSlide === 0) {
			setCurrentSlide(quiz.questions.length - 1);
		} else {
			setCurrentSlide(currentSlide - 1);
		}
	}

	if (Object.keys(quiz).length < 1) return <h1>Loading...</h1>;
	return (
		<main>
			<h1 style={{ margin: '1em 0' }}>Solving Quiz: {quiz.name}</h1>
			{quiz.questions.length < 1 ? (
				<div className>
					<h2>No questions added to the quiz</h2>
					<button
						className="question-btn"
						onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
					>
						Add Questions
					</button>
				</div>
			) : (
				<div className="slide-container" {...handlers}>
					<QuestionSlide question={quiz.questions[currentSlide]} />
					<div className="slides-navigation">
						<button
							id="previous"
							className="question-btn"
							onClick={previousSlide}
						>
							Previous
						</button>
						<button id="next" className="question-btn" onClick={nextSlide}>
							Next
						</button>
					</div>
				</div>
			)}
		</main>
	);
};
export default Quiz;
