import React, { useState, useEffect, useRef } from 'react';

const MicSearch = ({ onAddTask }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Sorry, your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      setListening(false);
      if (onAddTask && speechToText.trim().length > 0) {
        onAddTask({ id: Date.now(), title: speechToText, completed: false });
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onAddTask]);

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <div className="mic-search-container">
      <button 
        onClick={toggleListening} 
        className={`mic-btn ${listening ? 'listening' : ''}`}
        aria-label={listening ? 'Stop listening' : 'Start listening'}
      >
        {listening ? '🎙️ Listening...' : '🎤 Start voice task'}
      </button>
      {transcript && <p className="transcript">You said: "{transcript}"</p>}
    </div>
  );
};

export default MicSearch;
