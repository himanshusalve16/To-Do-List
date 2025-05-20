import React, { useState } from 'react';
import { FaTrash, FaEdit, FaTimes, FaSave } from 'react-icons/fa';

const TodoItem = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [showDescription, setShowDescription] = useState(false);

  const handleUpdate = () => {
    if (!editTitle.trim()) return;
    
    updateTodo(todo.id, {
      ...todo,
      title: editTitle.trim(),
      description: editDescription.trim()
    });
    
    setIsEditing(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-description"
            placeholder="Description (optional)"
          />
          <div className="edit-actions">
            <button onClick={handleUpdate} className="save-btn">
              <FaSave /> Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <div className="todo-header">
              <div className="todo-checkbox-title">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="todo-checkbox"
                />
                <h3 className="todo-title">{todo.title}</h3>
              </div>
              <div className="todo-actions">
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  <FaEdit />
                </button>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                  <FaTrash />
                </button>
              </div>
            </div>
            
            {todo.description && (
              <div className="description-section">
                <button 
                  onClick={() => setShowDescription(!showDescription)}
                  className="show-description-btn"
                >
                  {showDescription ? 'Hide Description' : 'Show Description'}
                </button>
                {showDescription && (
                  <p className="todo-description">{todo.description}</p>
                )}
              </div>
            )}
            
            <div className="todo-date">
              Created: {formatDate(todo.createdAt)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;