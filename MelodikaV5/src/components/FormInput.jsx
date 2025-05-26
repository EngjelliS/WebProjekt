import React, { useState, useEffect } from 'react';

const FormInput = ({ 
  type = 'text', 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  error, 
  required = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value && value.length > 0);
  }, [value]);

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelClasses = `form-label ${(isFocused || hasValue) ? 'active' : ''}`;

  return (
    <div className="form-group">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        className={`form-control ${error ? 'error' : ''}`}
        placeholder=""
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormInput;