import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const API_URL = "http://localhost:5000/todos";

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      setMessage("Failed to load todos");
    }
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(API_URL, { text });
      setText("");
      fetchTodos();
    } catch (error) {
      setMessage("Failed to add todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      setMessage("Failed to delete todo");
    }
  };

  const sendSummary = async () => {
    try {
      const res = await axios.post("http://localhost:5000/summarize");
      setMessage(res.data.message || "Summary sent successfully");
    } catch (error) {
      setMessage("Failed to send summary");
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditedText(todo.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedText("");
  };

  const saveTodo = async (id) => {
    if (!editedText.trim()) return;
    try {
      await axios.put(`${API_URL}/${id}`, { text: editedText });
      setEditingId(null);
      setEditedText("");
      fetchTodos();
    } catch (error) {
      setMessage("Failed to update todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>📋 Todo Summary Assistant</h1>
      
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button className="add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div className="todo-item" key={todo._id}>
            {editingId === todo._id ? (
              <>
                <input
                  className="edit-input"
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveTodo(todo._id)}
                />
                <button className="save-btn" onClick={() => saveTodo(todo._id)}>
                  Save
                </button>
                <button className="cancel-btn" onClick={cancelEditing}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="todo-text">{todo.text}</div>
                <div className="todo-actions">
                  <button className="edit-btn" onClick={() => startEditing(todo)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <button className="summary-btn" onClick={sendSummary}>
        Generate & Send Summary
      </button>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;