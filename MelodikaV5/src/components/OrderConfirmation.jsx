import React from 'react';

const OrderConfirmation = ({ orderNumber }) => {
  return (
    <section className="order-confirmation">
      <div className="confirmation-container fade-in">
        <div className="confirmation-icon">
          <svg viewBox="0 0 24 24" className="check-icon">
            <path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z" fill="currentColor"/>
          </svg>
        </div>
        
        <h2>Vielen Dank für Ihre Bestellung!</h2>
        
        <div className="order-details">
          <p className="order-number-label">Ihre Bestellnummer:</p>
          <p className="order-number">{orderNumber}</p>
        </div>
        
        <div className="confirmation-message">
          <p>Wir haben Ihnen eine Bestätigungsmail gesendet.</p>
          <p>Sie können den Status Ihrer Bestellung jederzeit in der Bestellübersicht verfolgen.</p>
        </div>
        
        <div className="confirmation-actions">
          <a href="/" className="cta-button primary">
            Zurück zur Startseite
          </a>
          <a href="/bestelluebersicht" className="cta-button secondary">
            Bestellübersicht anzeigen
          </a>
        </div>
        
        <div className="confirmation-info">
          <div className="info-box">
            <h3>📦 Versand</h3>
            <p>Ihre Bestellung wird in der Regel innerhalb von 1-2 Werktagen versandt.</p>
          </div>
          
          <div className="info-box">
            <h3>💳 Zahlung</h3>
            <p>Die Zahlungsabwicklung erfolgt sicher über unsere Partner.</p>
          </div>
          
          <div className="info-box">
            <h3>📞 Support</h3>
            <p>Bei Fragen erreichen Sie uns über unsere <a href="/hilfe">Hilfe-Seite</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;