const Overlay = ({ isModalOpen, setIsModalOpen }) => {
	return (
		<div
			className="overlay"
			onClick={() => setIsModalOpen(false)}
			style={{ display: `${isModalOpen ? 'block' : 'none'}` }}
		></div>
	);
};

export default Overlay;
