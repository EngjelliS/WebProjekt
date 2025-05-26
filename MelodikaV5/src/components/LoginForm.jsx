import React, { useState } from 'react';
import FormInput from './FormInput';

const LoginForm = ({ isActive }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically send data to a server
      console.log('Login submitted:', formData);
      alert('Login erfolgreich! (Simuliert)');
    }
  };

  return (
    <div className={`auth-form login-form ${isActive ? 'active' : ''} fade-in`}>
      <div className="form-inner">
        <h2>Bei Melodika anmelden</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            id="email"
            name="email"
            label="E-Mail"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            label="Passwort"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={(e) => handleInputChange('remember', e.target.checked)}
              />
              <label htmlFor="remember">Angemeldet bleiben</label>
            </div>
            <a href="#" className="forgot-password">Passwort vergessen?</a>
          </div>

          <button type="submit" className="auth-button">
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;