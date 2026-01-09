import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  // Add a task
  const handleAddTask = () => {
    if (taskText.trim() === "") return; // ignore empty
    const newTask = {
      id: Date.now(), // unique id
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  // Toggle complete
  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", color: "#3B82F6" }}>Task Manager</h1>

      {/* Add Task */}
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter new task..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#3B82F6",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div>
        {tasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748B" }}>No tasks yet — add your first task!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                backgroundColor: "#E0F2FE",
                alignItems: "center",
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  style={{ marginRight: "10px" }}
                />
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "#ef4444",
                  fontWeight: "bold",
                }}
              >
                X
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
