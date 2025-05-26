import React from 'react';

const CartItems = ({ cart, products, onUpdateQuantity, onSetQuantity, onRemoveItem }) => {
  const formatCurrency = (amount) => {
    return amount.toFixed(2).replace('.', ',') + ' €';
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      // Reset to current quantity if invalid
      const currentItem = cart.find(item => item.id === productId);
      event.target.value = currentItem ? currentItem.quantity : 1;
      return;
    }
    onSetQuantity(productId, newQuantity);
  };

  return (
    <div className="cart-items">
      {cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return null;

        const itemSubtotal = product.price * item.quantity;

        return (
          <div key={product.id} className="cart-item">
            <img
              src={`${product.image}`}
              alt={product.name}
              className="item-image"
              onError={(e) => {
                e.target.src = '/src/assets/images/placeholder.jpg';
              }}
            />
            <div className="item-details">
              <h3 className="item-name">{product.name}</h3>
              <p className="item-price">{formatCurrency(product.price)}</p>
              <div className="item-controls">
                <div className="quantity-control">
                  <button
                    className="quantity-btn decrease"
                    onClick={() => onUpdateQuantity(product.id, -1)}
                    aria-label="Menge verringern"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="quantity-input"
                    onChange={(e) => handleQuantityChange(product.id, e)}
                    aria-label="Menge"
                  />
                  <button
                    className="quantity-btn increase"
                    onClick={() => onUpdateQuantity(product.id, 1)}
                    aria-label="Menge erhöhen"
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(product.id)}
                  aria-label={`${product.name} entfernen`}
                >
                  <svg className="remove-icon" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                  Entfernen
                </button>
              </div>
            </div>
            <div className="item-subtotal">{formatCurrency(itemSubtotal)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;