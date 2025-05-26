import React, { useState } from 'react';

const CheckoutForm = ({ total, onBackToCart, onCompleteOrder }) => {
  const [formData, setFormData] = useState({
    // Kontaktinformationen
    email: '',
    phone: '',
    
    // Lieferadresse
    deliveryName: '',
    deliveryStreet: '',
    deliveryZip: '',
    deliveryCity: '',
    deliveryCountry: '',
    
    // Rechnungsadresse
    sameAddress: true,
    billingName: '',
    billingStreet: '',
    billingZip: '',
    billingCity: '',
    billingCountry: '',
    
    // Zahlung
    paymentMethod: '',
    ccName: '',
    ccNumber: '',
    ccExpiry: '',
    ccCvv: '',
    
    // Lieferhinweise
    deliveryNotes: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Fehler entfernen wenn Feld ausgefüllt wird
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Kreditkartennummer formatieren
  const formatCreditCard = (value) => {
    const v = value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < v.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += v[i];
    }
    return formatted.substring(0, 19);
  };

  // Ablaufdatum formatieren
  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length > 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'ccNumber') {
      formattedValue = formatCreditCard(value);
    } else if (name === 'ccExpiry') {
      formattedValue = formatExpiry(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Pflichtfelder prüfen
    if (!formData.email) newErrors.email = 'E-Mail ist erforderlich';
    if (!formData.phone) newErrors.phone = 'Telefonnummer ist erforderlich';
    if (!formData.deliveryName) newErrors.deliveryName = 'Name ist erforderlich';
    if (!formData.deliveryStreet) newErrors.deliveryStreet = 'Straße ist erforderlich';
    if (!formData.deliveryZip) newErrors.deliveryZip = 'PLZ ist erforderlich';
    if (!formData.deliveryCity) newErrors.deliveryCity = 'Stadt ist erforderlich';
    if (!formData.deliveryCountry) newErrors.deliveryCountry = 'Land ist erforderlich';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Zahlungsart ist erforderlich';

    // Rechnungsadresse prüfen wenn abweichend
    if (!formData.sameAddress) {
      if (!formData.billingName) newErrors.billingName = 'Name ist erforderlich';
      if (!formData.billingStreet) newErrors.billingStreet = 'Straße ist erforderlich';
      if (!formData.billingZip) newErrors.billingZip = 'PLZ ist erforderlich';
      if (!formData.billingCity) newErrors.billingCity = 'Stadt ist erforderlich';
      if (!formData.billingCountry) newErrors.billingCountry = 'Land ist erforderlich';
    }

    // Kreditkartendaten prüfen
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.ccName) newErrors.ccName = 'Name des Karteninhabers ist erforderlich';
      if (!formData.ccNumber) newErrors.ccNumber = 'Kartennummer ist erforderlich';
      if (!formData.ccExpiry) newErrors.ccExpiry = 'Ablaufdatum ist erforderlich';
      if (!formData.ccCvv) newErrors.ccCvv = 'CVV ist erforderlich';
    }

    // E-Mail validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Bestelldaten zusammenstellen
    const orderData = {
      customer: {
        email: formData.email,
        phone: formData.phone,
        fullName: formData.deliveryName
      },
      shippingAddress: `${formData.deliveryName}\n${formData.deliveryStreet}\n${formData.deliveryZip} ${formData.deliveryCity}\n${getCountryName(formData.deliveryCountry)}`,
      billingAddress: formData.sameAddress 
        ? `${formData.deliveryName}\n${formData.deliveryStreet}\n${formData.deliveryZip} ${formData.deliveryCity}\n${getCountryName(formData.deliveryCountry)}`
        : `${formData.billingName}\n${formData.billingStreet}\n${formData.billingZip} ${formData.billingCity}\n${getCountryName(formData.billingCountry)}`,
      paymentMethod: getPaymentMethodName(formData.paymentMethod),
      paymentInfo: getPaymentInfo(),
      deliveryNotes: formData.deliveryNotes
    };

    onCompleteOrder(orderData);
  };

  const getCountryName = (code) => {
    const countries = {
      'DE': 'Deutschland',
      'AT': 'Österreich',
      'CH': 'Schweiz'
    };
    return countries[code] || code;
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      'credit-card': 'Kreditkarte',
      'paypal': 'PayPal',
      'invoice': 'Rechnung',
      'instant-transfer': 'Sofortüberweisung'
    };
    return methods[method] || method;
  };

  const getPaymentInfo = () => {
    switch (formData.paymentMethod) {
      case 'credit-card':
        const lastFour = formData.ccNumber.replace(/\s/g, '').slice(-4);
        return `**** **** **** ${lastFour}`;
      case 'paypal':
        return formData.email;
      default:
        return '';
    }
  };

  const formatCurrency = (amount) => {
    return amount.toFixed(2).replace('.', ',') + ' €';
  };

  return (
    <section className="checkout-section">
      <div className="checkout-container fade-in">
        <div className="checkout-header">
          <h2>Kasse</h2>
          <button className="back-button" onClick={onBackToCart}>
            Zurück zum Warenkorb
          </button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Kontaktinformationen */}
          <div className="form-section">
            <h3 className="section-title">Kontaktinformationen</h3>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-Mail"
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Telefonnummer"
                className={errors.phone ? 'error' : ''}
                required
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          {/* Lieferadresse */}
          <div className="form-section">
            <h3 className="section-title">Lieferadresse</h3>
            <div className="form-group">
              <input
                type="text"
                name="deliveryName"
                value={formData.deliveryName}
                onChange={handleInputChange}
                placeholder="Vor- und Nachname"
                className={errors.deliveryName ? 'error' : ''}
                required
              />
              {errors.deliveryName && <span className="error-message">{errors.deliveryName}</span>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="deliveryStreet"
                value={formData.deliveryStreet}
                onChange={handleInputChange}
                placeholder="Straße und Hausnummer"
                className={errors.deliveryStreet ? 'error' : ''}
                required
              />
              {errors.deliveryStreet && <span className="error-message">{errors.deliveryStreet}</span>}
            </div>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  name="deliveryZip"
                  value={formData.deliveryZip}
                  onChange={handleInputChange}
                  placeholder="PLZ"
                  className={errors.deliveryZip ? 'error' : ''}
                  required
                />
                {errors.deliveryZip && <span className="error-message">{errors.deliveryZip}</span>}
              </div>
              <div className="form-group half">
                <input
                  type="text"
                  name="deliveryCity"
                  value={formData.deliveryCity}
                  onChange={handleInputChange}
                  placeholder="Stadt"
                  className={errors.deliveryCity ? 'error' : ''}
                  required
                />
                {errors.deliveryCity && <span className="error-message">{errors.deliveryCity}</span>}
              </div>
            </div>
            <div className="form-group">
              <select
                name="deliveryCountry"
                value={formData.deliveryCountry}
                onChange={handleInputChange}
                className={errors.deliveryCountry ? 'error' : ''}
                required
              >
                <option value="" disabled>Land auswählen</option>
                <option value="DE">Deutschland</option>
                <option value="AT">Österreich</option>
                <option value="CH">Schweiz</option>
              </select>
              {errors.deliveryCountry && <span className="error-message">{errors.deliveryCountry}</span>}
            </div>
          </div>

          {/* Rechnungsadresse */}
          <div className="form-section">
            <h3 className="section-title">Rechnungsadresse</h3>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                name="sameAddress"
                id="same-address"
                checked={formData.sameAddress}
                onChange={handleInputChange}
              />
              <label htmlFor="same-address">
                Rechnungsadresse entspricht der Lieferadresse
              </label>
            </div>

            {!formData.sameAddress && (
              <div className="billing-fields">
                <div className="form-group">
                  <input
                    type="text"
                    name="billingName"
                    value={formData.billingName}
                    onChange={handleInputChange}
                    placeholder="Vor- und Nachname"
                    className={errors.billingName ? 'error' : ''}
                  />
                  {errors.billingName && <span className="error-message">{errors.billingName}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="billingStreet"
                    value={formData.billingStreet}
                    onChange={handleInputChange}
                    placeholder="Straße und Hausnummer"
                    className={errors.billingStreet ? 'error' : ''}
                  />
                  {errors.billingStreet && <span className="error-message">{errors.billingStreet}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <input
                      type="text"
                      name="billingZip"
                      value={formData.billingZip}
                      onChange={handleInputChange}
                      placeholder="PLZ"
                      className={errors.billingZip ? 'error' : ''}
                    />
                    {errors.billingZip && <span className="error-message">{errors.billingZip}</span>}
                  </div>
                  <div className="form-group half">
                    <input
                      type="text"
                      name="billingCity"
                      value={formData.billingCity}
                      onChange={handleInputChange}
                      placeholder="Stadt"
                      className={errors.billingCity ? 'error' : ''}
                    />
                    {errors.billingCity && <span className="error-message">{errors.billingCity}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <select
                    name="billingCountry"
                    value={formData.billingCountry}
                    onChange={handleInputChange}
                    className={errors.billingCountry ? 'error' : ''}
                  >
                    <option value="" disabled>Land auswählen</option>
                    <option value="DE">Deutschland</option>
                    <option value="AT">Österreich</option>
                    <option value="CH">Schweiz</option>
                  </select>
                  {errors.billingCountry && <span className="error-message">{errors.billingCountry}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Zahlungsart */}
          <div className="form-section">
            <h3 className="section-title">Zahlungsart</h3>
            <div className="form-group">
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className={errors.paymentMethod ? 'error' : ''}
                required
              >
                <option value="" disabled>Zahlungsart wählen</option>
                <option value="credit-card">Kreditkarte</option>
                <option value="paypal">PayPal</option>
                <option value="invoice">Rechnung</option>
                <option value="instant-transfer">Sofortüberweisung</option>
              </select>
              {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
            </div>

            {formData.paymentMethod === 'credit-card' && (
              <div className="credit-card-fields">
                <div className="form-group">
                  <input
                    type="text"
                    name="ccName"
                    value={formData.ccName}
                    onChange={handleInputChange}
                    placeholder="Name des Karteninhabers"
                    className={errors.ccName ? 'error' : ''}
                  />
                  {errors.ccName && <span className="error-message">{errors.ccName}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="ccNumber"
                    value={formData.ccNumber}
                    onChange={handleCreditCardChange}
                    placeholder="Kartennummer"
                    className={errors.ccNumber ? 'error' : ''}
                    maxLength="19"
                  />
                  {errors.ccNumber && <span className="error-message">{errors.ccNumber}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <input
                      type="text"
                      name="ccExpiry"
                      value={formData.ccExpiry}
                      onChange={handleCreditCardChange}
                      placeholder="MM/JJ"
                      className={errors.ccExpiry ? 'error' : ''}
                      maxLength="5"
                    />
                    {errors.ccExpiry && <span className="error-message">{errors.ccExpiry}</span>}
                  </div>
                  <div className="form-group half">
                    <input
                      type="text"
                      name="ccCvv"
                      value={formData.ccCvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                      className={errors.ccCvv ? 'error' : ''}
                      maxLength="4"
                    />
                    {errors.ccCvv && <span className="error-message">{errors.ccCvv}</span>}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lieferhinweise */}
          <div className="form-section">
            <h3 className="section-title">Lieferhinweise</h3>
            <div className="form-group">
              <textarea
                name="deliveryNotes"
                value={formData.deliveryNotes}
                onChange={handleInputChange}
                placeholder="Besondere Hinweise zur Lieferung (optional)"
                rows="3"
              />
            </div>
          </div>

          {/* Zusammenfassung */}
          <div className="checkout-summary">
            <div className="summary-row">
              <span>Gesamtsumme</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button type="submit" className="cta-button">
              Bestellung abschließen
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;