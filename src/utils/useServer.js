const useServer = () => {
	const mockAPI =
		process.env.REACT_APP_MODE === 'development'
			? process.env.REACT_APP_LOCAL_JSON_SERVER
			: process.env.REACT_APP_DEPLOYED_JSON_SERVER;

	return { mockAPI };
};

export default useServer;
