import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate('/');
		}, 2000);
	}, [navigate]);

	return <h1>Not Found</h1>;
};
export default NotFound;
