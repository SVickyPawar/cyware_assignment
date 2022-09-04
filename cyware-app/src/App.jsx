import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import SingleTask from "./components/SingleTask";

function App() {

  ///// States  ////
	var taskData = JSON.parse(localStorage.getItem("taskData"));
	const [tasks, setTasks] = useState(taskData || []);
	const [inputValue, setInputValue] = useState("");
	const [assignTo, setAssignTo] = useState("Vivek");
	const [file, setFile] = useState(null);
	const [search, setSearch] = useState("");
	const [filterData, setFilterData] = useState({});
	const [loading, setLoading] = useState(false);


  // Handle Change function //
	const handleChange = (e) => {
		setInputValue(e.target.value);
  };
  
  // Handle Submit Function //
	const handleSubmit = (inputValue, assignTo, file) => {
		setTasks([
			...tasks,
			{
				id: Date.now(),
				content: inputValue,
				status: "start",
				assignee: assignTo,
				attachment: file,
				bgColor: "orange",
			},
		]);
		setInputValue("");
		setAssignTo("Vivek");
		console.log(tasks);
		localStorage.setItem("taskData", JSON.stringify(tasks));
	};

  // DragOver //
	const dragOver = (e) => {
		console.log("drag over");
		e.preventDefault();
  };
  
  // Drag Drop Function //
	var count = 0;
	const dragDrop = (e, newStatus, color) => {
		count++;
		console.log("drop");
		let transferedData = e.dataTransfer.getData("todoId");
		console.log(transferedData, "transferData");
		let newData = tasks.filter((el) => {
			if (el.id == transferedData) {
				el.status = newStatus;
				el.bgColor = color;
				//console.log("status", el.status)
				return el;
			}
		});
		setTasks([...tasks, newData]);
		localStorage.setItem("taskData", JSON.stringify(tasks));
		//setWorking([...working, newData]);
		//console.log(value)
		if (count > 0) {
			alert("Sure to change status ?");
		}
		count = 0;
	};

	const handleAttachment = (e) => {
		setFile(e.target.files[0]);
		console.log(file);
	};

	const handleSearch = () => {
		// let interval=setInterval(() => {
		//   setLoading(true);
		// }, 500)

		// setLoading(false)
		console.log(search);

		var searchData = tasks.filter((el) => el.content == search);
		console.log(searchData);

		searchData && setFilterData(searchData);
		console.log(filterData, "filterData");
	};

	return (
		<>
			<div className="navbar">
				<div className="header-task">
					<label>Task </label>
					<input
						value={inputValue}
						onChange={handleChange}
						type="text"
						placeholder="Enter Task"
					/>
					<label>Assignee </label>
					<input
						type="text"
						value={assignTo}
						onChange={(e) => setAssignTo(e.target.value)}
					/>
					<label>Attachment </label>
					<input
						type="file"
						id="fileName"
						onChange={(e) => handleAttachment(e)}
					/>
					<button
						onClick={() => {
							if (inputValue.length > 0) {
								handleSubmit(inputValue, assignTo, file);
							}
						}}
					>
						Add
					</button>
				</div>
				<div className="navbarSearch">
					<span>Search </span>
					<input
						placeholder="Search here"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button onClick={handleSearch}>Search</button>
				</div>
			</div>

			<div className="App">
				<div className="task-box">
					<div
						onDragOver={(e) => dragOver(e)}
						onDrop={(e) => dragDrop(e, "start", "orange")}
						className="start"
					>
						<span>
							<h3>Task to be completed</h3>
							<hr />
						</span>
						{tasks.length > 0 &&
							tasks.map((el) => (
								<div style={{ backgroundColor: el.bgColor }} key={el.id}>
									{el.status == "start" && <SingleTask task={el} />}
								</div>
							))}
					</div>
					<div
						onDragOver={(e) => dragOver(e)}
						onDrop={(e) => dragDrop(e, "wip", "yellow")}
						className="wip"
					>
						<span>
							<h3> Tasks in progress</h3>
							<hr />
						</span>
						{tasks &&
							tasks.map((el) => (
								<div style={{ backgroundColor: el.bgColor }} key={el.id}>
									{el.status == "wip" && <SingleTask task={el} />}
								</div>
							))}
					</div>
					<div
						onDragOver={(e) => dragOver(e)}
						onDrop={(e) => dragDrop(e, "done", "green")}
						className="done"
					>
						<span>
							<h3>Tasks completed</h3>
							<hr />
						</span>
						{tasks &&
							tasks.map((el) => (
								<div style={{ backgroundColor: el.bgColor }} key={el.id}>
									{el.status == "done" && <SingleTask task={el} />}
								</div>
							))}
					</div>
				</div>
				<div className="search_Box">
					{loading ? (
						<div>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
								alt=""
							/>
						</div>
					) : (
						filterData.length > 0 && (
							<div>
								<p>Task: {filterData.length > 0 && filterData[0].content}</p>
								<p>
									Assignee: {filterData.length > 0 && filterData[0].assignee}
								</p>
							</div>
						)
					)}
				</div>
			</div>
		</>
	);
}

export default App;
