import React, { useState } from 'react';

const StickyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, input]);
      setInput('');
    }
  };

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📝 Sticky Notes</h3>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        
          style={styles.input}
        />
        <button onClick={addNote} style={styles.addButton}>Add</button>
      </div>
      <div>
        {notes.map((note, index) => (
          <div key={index} style={styles.note}>
            <span>{note}</span>
            <button onClick={() => deleteNote(index)} style={styles.deleteButton}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    right: '20px',
    top: '80px',
    width: '280px',
    padding: '20px',
    backgroundColor: '#3a5a8c', // main blue background
    border: '1px solid #274870', // darker blue border
    borderRadius: '16px',
    boxShadow: '0 6px 18px rgba(39, 72, 112, 0.7)',
    zIndex: 1000,
    color: '#f0f4ff', // light text color
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    margin: 0,
    marginBottom: '12px',
    fontSize: '20px',
    color: '#f0f4ff',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '15px',
  },
  input: {
    flex: 1,
    padding: '8px',
    borderRadius: '8px 0 0 8px',
    border: '1px solid #274870',
    fontSize: '0.9rem',
    color: '#f0f4ff',
    backgroundColor: 'rgba(240, 244, 255, 0.15)',
    outline: 'none',
  },
  addButton: {
    padding: '8px 14px',
    backgroundColor: '#274870',
    border: 'none',
    borderRadius: '0 8px 8px 0',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s ease',
  },
  note: {
    backgroundColor: '#274870', // darker blue for each note
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#f0f4ff',
    fontSize: '0.95rem',
    wordWrap: 'break-word',
    boxShadow: '0 4px 10px rgba(39, 72, 112, 0.7)',
    transition: 'box-shadow 0.3s ease',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#ff6b6b',
    fontSize: '1.1rem',
    transition: 'color 0.3s ease',
  },
};

// Add hover effect for add and delete buttons using inline styles is tricky.
// You might consider switching to CSS modules or styled-components for better control.

export default StickyNotes;
