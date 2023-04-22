import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
	const navigate = useNavigate();

	return (
		<main>
			<Header />
			<h2>Welcome to Quiz Maker Application</h2>
			<article>
				<section onClick={() => navigate('/create-quiz')}>
					Make a New Quiz
				</section>
				<section onClick={() => navigate('/quizzes')}>
					Review Existing Quizzes
				</section>
				<section onClick={() => navigate('/questions')}>
					Review Existing Questions
				</section>
			</article>
		</main>
	);
};

export default Home;
