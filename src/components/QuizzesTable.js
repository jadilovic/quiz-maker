const QuizzesTable = ({ quizzes, startQuiz, handleEdit, handleDelete }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{quizzes.map((item, index) => (
					<tr
						style={{
							backgroundColor: `${
								index % 2 ? 'rgb(180, 179, 179)' : 'lightgrey'
							}`,
						}}
						key={item.id}
						onClick={() => startQuiz(item.id)}
					>
						<td>{item.name}</td>
						<td>
							<button
								className="create-btn"
								style={{
									minWidth: '5em',
									margin: '0.3em',
									height: '2.5em',
									width: '40%',
								}}
								onClick={(e) => handleEdit(e, item.id)}
							>
								Edit
							</button>
							<button
								className="remove-button"
								style={{
									minWidth: '5em',
									margin: '0.3em',
									height: '2.5em',
									width: '40%',
								}}
								onClick={(e) => handleDelete(e, item.id)}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default QuizzesTable;
