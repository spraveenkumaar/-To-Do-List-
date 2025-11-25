import React, { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    document.body.style.background = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    return () => {
      document.body.style.background = null;
      document.body.style.backgroundSize = null;
    };
  }, []);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text }]);
    setText("");
  };

  const deleteTodo = id => {
    setTodos(todos.filter(t => t.id !== id));
    if (editId === id) {
      setEditId(null);
      setEditText("");
    }
  };

  const startEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const saveEdit = id => {
    setTodos(todos.map(t => (t.id === id ? { ...t, text: editText } : t)));
    setEditId(null);
    setEditText("");
  };

  return (
    <div>
      <center>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/942/942751.png" 
          alt="Virtual" 
          width="120" 
          height="120" 
        />
        <h2 style={{fontSize: '2em'}}>My To-Do List</h2>
        <input 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Add a task..." 
          size="40" 
        />
        <button onClick={addTodo} style={{fontSize: '1.2em'}}>Add</button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {editId === todo.id ? (
                <input 
                  value={editText} 
                  onChange={e => setEditText(e.target.value)} 
                  size="30"
                />
              ) : (
                todo.text
              )}
              {editId === todo.id ? (
                <button onClick={() => saveEdit(todo.id)} style={{fontSize: '1em'}}>Save</button>
              ) : (
                <button onClick={() => startEdit(todo.id, todo.text)} style={{fontSize: '1em'}}>Edit</button>
              )}
              <button onClick={() => deleteTodo(todo.id)} style={{fontSize: '1em'}}>Delete</button>
            </li>
          ))}
        </ul>
      </center>
    </div>
  );
}
