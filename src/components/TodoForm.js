import React, { useState } from 'react';
import { FaPlus, FaAlignLeft, FaTimes } from 'react-icons/fa';

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
      <h2 className="form-title">Create New Task</h2>
      
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
          autoFocus
        />
        <button type="submit" className="add-button" title="Add Task">
          <FaPlus />
        </button>
      </div>
      
      <div className="description-toggle">
        <button 
          type="button" 
          onClick={() => setShowDescription(!showDescription)}
          className="toggle-description-btn"
        >
          {showDescription ? (
            <>
              <FaTimes /> Hide Description
            </>
          ) : (
            <>
              <FaAlignLeft /> Add Description
            </>
          )}
        </button>
      </div>
      
      {showDescription && (
        <div className="description-container">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about this task..."
            className="description-input"
            rows="4"
          />
          <div className="description-hint">Add notes, links, or any additional information</div>
        </div>
      )}
    </form>
  );
};

export default TodoForm;
