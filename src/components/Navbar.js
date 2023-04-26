import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isActive, setIsActive] = useState(false);

	return (
		<nav className="navbar">
			<a href="https://enterwell.net/" className="nav-logo">
				Enterwell
			</a>
			<ul className={`${isActive ? 'nav-menu active' : 'nav-menu'}`}>
				<li className="nav-item">
					<Link
						onClick={() => setIsActive(false)}
						className="nav-link"
						to={'/'}
					>
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link
						onClick={() => setIsActive(false)}
						className="nav-link"
						to={'/quizzes'}
					>
						Quizzes
					</Link>
				</li>
				<li className="nav-item">
					<Link
						onClick={() => setIsActive(false)}
						className="nav-link"
						to={'/questions'}
					>
						Questions
					</Link>
				</li>
			</ul>
			<div
				onClick={() => setIsActive(!isActive)}
				className={`${isActive ? 'hamburger active' : 'hamburger'}`}
			>
				<span className="bar"></span>
				<span className="bar"></span>
				<span className="bar"></span>
			</div>
		</nav>
	);
};

export default Navbar;
