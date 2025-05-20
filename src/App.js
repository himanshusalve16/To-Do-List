import React, { useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  // Use our custom hook for localStorage persistence
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  // Apply the theme class to the body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Add a new todo
  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  // Toggle todo completion status
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Update a todo
  const updateTodo = (id, updatedTodo) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      )
    );
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="app-header">
        <h1>To-Do List</h1>
        <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      
      <div className="app-content">
        <TodoForm addTodo={addTodo} />
        <TodoList 
          todos={todos} 
          toggleComplete={toggleComplete} 
          deleteTodo={deleteTodo} 
          updateTodo={updateTodo} 
        />
      </div>
      
      <footer className="app-footer">
        <p>React To-Do List App © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
