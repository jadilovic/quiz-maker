const DeleteModal = ({
	isModalOpen,
	setIsModalOpen,
	handleConfirmedDelete,
}) => {
	return (
		<div
			className="delete-modal"
			style={{ display: `${isModalOpen ? 'block' : 'none'}` }}
		>
			<h2 className="modal-title">Delete Quiz?</h2>
			<p className="modal-description">
				Are you sure you want to delete this quiz? This will delete the quiz
				from database and it cannot be undone
			</p>
			<div className="cancel-confirm-container">
				<button
					onClick={() => setIsModalOpen(false)}
					id="cancel"
					className="cancel-confirm-btn"
				>
					no. cancel
				</button>
				<button
					onClick={handleConfirmedDelete}
					id="confirm"
					className="cancel-confirm-btn"
				>
					yes. delete
				</button>
			</div>
		</div>
	);
};
export default DeleteModal;
