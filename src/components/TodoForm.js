import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addTodo({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date()
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setShowDescription(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          <FaPlus />
        </button>
      </div>
      
      <div className="description-toggle">
        <button 
          type="button" 
          onClick={() => setShowDescription(!showDescription)}
          className="toggle-description-btn"
        >
          {showDescription ? 'Hide Description' : 'Add Description'}
        </button>
      </div>
      
      {showDescription && (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add description (optional)"
          className="description-input"
        />
      )}
    </form>
  );
};

export default TodoForm;
