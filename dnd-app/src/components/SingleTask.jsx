import React from "react";


const SingleTask = ({ task }) => {
	const dragStart = (e, id) => {
		e.dataTransfer.setData("todoId", id);

		console.log(id);
	};
	return (
		<div
			draggable={true}
			onDragStart={(e) => dragStart(e, task.id)}
			style={{
				boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
				height: "30px",
				margin: "5px",
			
			}}
			key={task.id}
		>
			<p style={{ marginTop: "0px" }}>{task.content}</p>
		</div>
	);
};

export default SingleTask;
