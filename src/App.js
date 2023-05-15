import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quizzes from './pages/Quizzes';
import CreateQuiz from './pages/CreateQuiz';
import EditQuiz from './pages/EditQuiz';
import Quiz from './pages/Quiz';
import Questions from './pages/Questions';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/quizzes" element={<Quizzes />} />
				<Route path="/create-quiz" element={<CreateQuiz />} />
				<Route path="/edit-quiz/:id" element={<EditQuiz />} />
				<Route path="/quizzes/:id" element={<Quiz />} />
				<Route path="/questions" element={<Questions />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
