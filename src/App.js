import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const API_URL = "http://localhost:5000/tasks";

  // fetch task on load
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // add tasks
  const handleAddTask = () => {
    if (!taskText.trim()) return;
    axios.post(API_URL, { text: taskText })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
    setTaskText("");
  };

  // toggle complete
  const handleToggleComplete = (id) => {
    axios.put(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)))
      .catch(err => console.error(err));
  };

  // delete tasks
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#3B82F6" }}>Task Manager</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
          placeholder="Enter new task..."
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginRight: "10px" }}
        />
        <button
          onClick={handleAddTask}
          style={{ padding: "10px 20px", border: "none", borderRadius: "8px", backgroundColor: "#3B82F6", color: "white", cursor: "pointer" }}
        >
          Add
        </button>
      </div>
      <div>
        {tasks.length === 0 ? <p style={{ textAlign: "center", color: "#64748B" }}>No tasks yet!</p> :
          tasks.map(task => (
            <div key={task.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px", marginBottom: "10px", borderRadius: "8px", backgroundColor: "#E0F2FE", alignItems: "center" }}>
              <div>
                <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task.id)} style={{ marginRight: "10px" }} />
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</span>
              </div>
              <button onClick={() => handleDelete(task.id)} style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", color: "#ef4444", fontWeight: "bold" }}>X</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
