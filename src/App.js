import React, { useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import useLocalStorage from './hooks/useLocalStorage';
import StickyNotes from './components/StickyNotes';
import MicSearch from './components/MicSearch';
import XPbar from './components/XPbar';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      )
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Calculate XP
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length || 1; // Prevent division by zero
  const currentXP = completedCount * 10;
  const maxXP = Math.max(totalCount * 10, 100); // Dynamic max based on total todos

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="app-header">
        <div className="header-row">
          <h1>To-Do List</h1>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>

      {/* XP Bar */}
      <div className="xp-bar-container">
        <h3 className="section-title">Experience Points</h3>
        <XPbar currentXP={currentXP} maxXP={maxXP} />
      </div>

      <div className="app-content">
        <TodoForm addTodo={addTodo} />

        {/* Mic Search Input */}
        <MicSearch onAddTask={addTodo} />

        <TodoList 
          todos={todos} 
          toggleComplete={toggleComplete} 
          deleteTodo={deleteTodo} 
          updateTodo={updateTodo} 
        />
      </div>
      
      {/* Sticky Notes Widget - positioned between todo list and footer */}
      <div className="sticky-notes-section">
        <StickyNotes />
      </div>
      
      <footer className="app-footer">
        <p>React To-Do List App © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
