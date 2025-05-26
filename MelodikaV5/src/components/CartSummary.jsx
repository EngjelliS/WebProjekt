import React from 'react';

const CartSummary = ({ subtotal, shipping, total, onCheckout }) => {
  const formatCurrency = (amount) => {
    return amount.toFixed(2).replace('.', ',') + ' €';
  };

  return (
    <div className="cart-summary">
      <div className="summary-row">
        <span>Zwischensumme</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Versand</span>
        <span>{shipping > 0 ? formatCurrency(shipping) : 'Kostenlos'}</span>
      </div>
      <div className="summary-row total">
        <span>Gesamtsumme</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <button 
        className="cta-button" 
        onClick={onCheckout}
        disabled={subtotal === 0}
      >
        Zur Kasse
      </button>
    </div>
  );
};

export default CartSummary;