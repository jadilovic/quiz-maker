import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate('/');
		}, 3000);
	}, [navigate]);

	return (
		<main className="notification">
			<h1>Not Found</h1>
			<h2 className="notification">
				You will be automatically returned to the Home Page.
			</h2>
		</main>
	);
};
export default NotFound;
