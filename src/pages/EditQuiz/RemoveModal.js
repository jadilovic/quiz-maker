const RemoveModal = ({
	isModalOpen,
	setIsModalOpen,
	handleConfirmedRemove,
}) => {
	return (
		<div
			className="delete-modal"
			style={{ display: `${isModalOpen ? 'block' : 'none'}` }}
		>
			<h2 className="modal-title">Remove Question?</h2>
			<p className="modal-description">
				Are you sure you want to remove this question? This will remove the
				question from the quiz and it cannot be undone
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
					onClick={handleConfirmedRemove}
					id="confirm"
					className="cancel-confirm-btn"
				>
					yes. remove
				</button>
			</div>
		</div>
	);
};
export default RemoveModal;
