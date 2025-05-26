import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = ({ 
  title, 
  subtitle, 
  buttonText, 
  onButtonClick, 
  secondaryLinkText, 
  secondaryLinkUrl,
  isAddingToCart
}) => {
  return (
    <section className="call-to-action-section">
      <div className="cta-container">
        <h2 className="cta-title">{title}</h2>
        <p className="cta-subtitle">{subtitle}</p>
        
        <div className="cta-buttons">
          <button 
            className={`cta-primary-button ${isAddingToCart ? 'button-adding' : ''}`}
            onClick={onButtonClick}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <span className="button-icon adding">✓</span>
                Hinzugefügt!
              </>
            ) : (
              <>
                <span className="button-icon">+</span>
                {buttonText}
              </>
            )}
          </button>
          
          <Link to={secondaryLinkUrl} className="cta-secondary-link">
            {secondaryLinkText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;