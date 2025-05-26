import React, { useEffect, useState } from 'react';

const Notification = ({ message, isSuccess = true, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation starten
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // Automatisches Ausblenden nach duration
    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    // Komponente nach Animation entfernen
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  return (
    <div className={`notification ${isVisible ? 'show' : ''} ${isSuccess ? 'success' : 'error'}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {isSuccess ? (
            <svg viewBox="0 0 24 24" className="icon-success">
              <path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" fill="currentColor"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="icon-error">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg>
          )}
        </span>
        <p className="notification-message">{message}</p>
      </div>
      
      <button 
        className="notification-close" 
        onClick={handleClose}
        aria-label="Benachrichtigung schließen"
      >
        <svg viewBox="0 0 24 24" className="close-icon">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
};

export default Notification;