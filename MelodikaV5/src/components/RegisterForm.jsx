import React, { useState } from 'react';
import FormInput from './FormInput';

const RegisterForm = ({ isActive }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    terms: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.name) {
      newErrors.name = 'Name ist erforderlich';
    }

    if (!formData.email) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }

    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Das Passwort muss mindestens 6 Zeichen lang sein';
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwort-Bestätigung ist erforderlich';
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Die Passwörter stimmen nicht überein';
    }

    if (!formData.terms) {
      newErrors.terms = 'Sie müssen den Nutzungsbedingungen zustimmen';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically send data to a server
      console.log('Registration submitted:', formData);
      alert('Registrierung erfolgreich! (Simuliert)');
    }
  };

  return (
    <div className={`auth-form register-form ${isActive ? 'active' : ''} fade-in`}>
      <div className="form-inner">
        <h2>Neues Konto erstellen</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            id="reg-name"
            name="name"
            label="Vollständiger Name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            required
          />

          <FormInput
            type="email"
            id="reg-email"
            name="email"
            label="E-Mail"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          <FormInput
            type="password"
            id="reg-password"
            name="password"
            label="Passwort"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />

          <FormInput
            type="password"
            id="reg-password-confirm"
            name="passwordConfirm"
            label="Passwort bestätigen"
            value={formData.passwordConfirm}
            onChange={handleInputChange}
            error={errors.passwordConfirm}
            required
          />

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={(e) => handleInputChange('terms', e.target.checked)}
              required
            />
            <label htmlFor="terms">
              Ich stimme den <a href="/nutzungsbedingungen" target="_blank">Nutzungsbedingungen</a> und <a href="/datenschutzrichtlinien" target="_blank">Datenschutzrichtlinien</a> zu
            </label>
            {errors.terms && <span className="error-message">{errors.terms}</span>}
          </div>

          <button type="submit" className="auth-button">
            Registrieren
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;