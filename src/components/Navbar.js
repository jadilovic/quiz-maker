import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to={'/'}>Home</Link>
				</li>
				<li>
					<Link to={'/quizzes'}>Quizzes</Link>
				</li>
				<li>
					<Link to={'/questions'}>Questions</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
