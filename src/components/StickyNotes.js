import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaTimes, FaStickyNote, FaArrowsAlt, FaGripLines } from 'react-icons/fa';

const StickyNotes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('stickyNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [input, setInput] = useState('');
  
  // Container position state
  const [containerPosition, setContainerPosition] = useState(() => {
    const savedPosition = localStorage.getItem('stickyNotesContainerPosition');
    // Default position at the bottom of the page
    if (!savedPosition) {
      // We'll set a default position at the bottom center of the viewport
      const defaultX = typeof window !== 'undefined' ? 
        Math.max(0, (window.innerWidth / 2) - 175) : 0; // 175 is half of container width
      const defaultY = typeof window !== 'undefined' ? 
        Math.max(0, window.innerHeight - 450) : 0; // Position from top to be near bottom
      return { x: defaultX, y: defaultY };
    }
    return JSON.parse(savedPosition);
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);
  
  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    // Save position to localStorage whenever it changes
    localStorage.setItem('stickyNotesContainerPosition', JSON.stringify(containerPosition));
  }, [containerPosition]);
  
  // Check if we're on a mobile device
  const isMobile = () => {
    return window.innerWidth <= 768;
  };
  
  // Position at bottom for mobile devices
  useEffect(() => {
    const handleResize = () => {
      if (isMobile()) {
        // For mobile, position at bottom
        const defaultX = 0; // Left aligned
        const defaultY = window.innerHeight - 300; // Near bottom of screen
        setContainerPosition({ x: defaultX, y: defaultY });
      }
    };
    
    // Set initial position
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Container drag handlers
  const handleContainerMouseDown = (e) => {
    // Only start dragging if clicking on the header and not on mobile
    if (e.target.closest('.sticky-notes-drag-handle') && !isMobile()) {
      setIsDragging(true);
      setDragStartPos({
        x: e.clientX - containerPosition.x,
        y: e.clientY - containerPosition.y
      });
    }
  };

  const handleContainerMouseMove = (e) => {
    if (isDragging) {
      // Calculate new position
      const newX = e.clientX - dragStartPos.x;
      const newY = e.clientY - dragStartPos.y;
      
      // Ensure the container stays within the viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const containerWidth = containerRef.current?.offsetWidth || 300;
      const containerHeight = containerRef.current?.offsetHeight || 400;
      
      // Limit the position to keep at least 100px of the container visible
      const boundedX = Math.max(100 - containerWidth, Math.min(newX, viewportWidth - 100));
      const boundedY = Math.max(0, Math.min(newY, viewportHeight - 100));
      
      setContainerPosition({ x: boundedX, y: boundedY });
    }
  };

  const handleContainerMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for container drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleContainerMouseMove);
      window.addEventListener('mouseup', handleContainerMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleContainerMouseMove);
      window.removeEventListener('mouseup', handleContainerMouseUp);
    };
  }, [isDragging, dragStartPos]);

  return (
    <div 
      className="sticky-notes-container"
      style={{
        position: 'absolute',
        left: `${containerPosition.x}px`,
        top: `${containerPosition.y}px`,
        zIndex: isDragging ? 1000 : 100,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      ref={containerRef}
      onMouseDown={handleContainerMouseDown}
    >
      <div className="sticky-notes-header">
        <div className="sticky-notes-drag-handle">
          <FaGripLines /> 
        </div>
        <h3 className="sticky-notes-title"><FaStickyNote /> Sticky Notes</h3>
        <p className="sticky-notes-subtitle">Drag header to move container</p>
      </div>
      <div className="sticky-notes-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a note..."
          className="sticky-notes-input"
          onKeyPress={(e) => e.key === 'Enter' && addNote()}
        />
        <button onClick={addNote} className="sticky-notes-add-button">
          <FaPlus />
        </button>
      </div>
      <div className="sticky-notes-list">
        {notes.length === 0 ? (
          <div className="sticky-notes-empty">No notes yet. Add your first note!</div>
        ) : (
          notes.map((note, index) => (
            <div 
              key={index} 
              className="sticky-note"
            >
              <p className="sticky-note-content">{note}</p>
              <button 
                onClick={() => deleteNote(index)} 
                className="sticky-note-delete-button"
                aria-label="Delete note"
              >
                <FaTimes />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Removed inline styles in favor of CSS classes

export default StickyNotes;
