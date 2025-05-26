import React, { useState, useEffect, useRef } from 'react';

const SupportSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supportContainerRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Bitte füllen Sie alle Felder aus.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = supportContainerRef.current.querySelectorAll('.fade-in');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="support-section" ref={supportContainerRef}>
      <div className="support-container">
        <h2 className="section-heading fade-in">Kontaktieren Sie uns</h2>

        <div className="support-cards">
          <div className="support-card fade-in">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" className="support-icon">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <h3>E-Mail-Support</h3>
            <p>Füllen Sie das Formular aus, und wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
            <div className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ihr Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ihre E-Mail"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Ihre Nachricht"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              <button type="button" className="submit-button" disabled={isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
            </div>
          </div>

          <div className="support-card fade-in">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" className="support-icon">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <h3>Telefon-Support</h3>
            <p>Für eine schnellere Hilfe rufen Sie uns direkt an:</p>
            <div className="phone-details">
              <p className="phone-number">+49 123 456 7890</p>
              <p className="phone-hours">Montag bis Freitag: 8:00 - 18:00 Uhr</p>
              <p className="phone-hours">Samstag: 10:00 - 14:00 Uhr</p>
            </div>
            <a href="tel:+491234567890" className="call-button">Jetzt anrufen</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
