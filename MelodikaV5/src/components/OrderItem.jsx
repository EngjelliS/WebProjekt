import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const OrderItem = ({ order, index, onShowDetails, onPrintInvoice, onTrackShipment }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  const formatCurrency = (amount) => {
    return amount.toFixed(2).replace('.', ',') + ' €';
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + (index * 100));

    return () => clearTimeout(timer);
  }, [index]);

  const handleTrackClick = () => {
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      onTrackShipment(order.orderNumber);
    }, 1200);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'pending':
        return 'pending';
      case 'canceled':
        return 'canceled';
      default:
        return 'pending';
    }
  };

  return (
    <div className={`order-item fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="order-header">
        <div className="order-info">
          <span className="order-number">Bestellnummer: {order.orderNumber}</span>
          <span className="order-date">Bestellt am: {order.orderDate}</span>
        </div>
        <div className={`order-status ${getStatusClass(order.status)}`}>
          <span>{order.statusText}</span>
        </div>
      </div>

      <div className="order-products">
        {order.products?.map((product, productIndex) => (
          <div key={productIndex} className="order-product">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image-small"
              onError={(e) => {
                e.target.src = '/placeholder.jpg';
              }}
            />
            <div className="product-details">
              <span className="product-name">{product.name}</span>
              <span className="product-price">{formatCurrency(product.price)}</span>
              <span className="product-quantity">Menge: {product.quantity}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="order-details">
        <div className="order-address">
          <h4>Lieferadresse</h4>
          <p dangerouslySetInnerHTML={{ 
            __html: order.address ? order.address.replace(/\n/g, '<br>') : 'Keine Adresse verfügbar' 
          }} />
        </div>
        <div className="order-payment">
          <h4>Zahlungsart</h4>
          <p>{order.paymentMethod}</p>
          {order.paymentInfo && (
            <p className="payment-info">{order.paymentInfo}</p>
          )}
        </div>
        <div className="order-shipping">
          <h4>Lieferinformationen</h4>
          <p>{order.shippingInfo}</p>
        </div>
      </div>

      <div className="order-footer">
        <div className="order-total">
          <span>Gesamtsumme: <strong>{order.totalAmount}</strong></span>
        </div>
        <div className="order-actions">
          {order.status === 'completed' ? (
            <button 
              className="action-button" 
              onClick={() => onPrintInvoice(order.orderNumber)}
            >
              Rechnung
            </button>
          ) : (
            <button 
              className={`action-button track-button ${isTracking ? 'loading' : ''}`}
              onClick={handleTrackClick}
              disabled={isTracking}
            >
              {isTracking ? '' : 'Sendung verfolgen'}
            </button>
          )}
          <button 
            className="action-button secondary" 
            onClick={() => onShowDetails(order.orderNumber)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    orderNumber: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    statusText: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired
    })),
    address: PropTypes.string,
    paymentMethod: PropTypes.string.isRequired,
    paymentInfo: PropTypes.string,
    shippingInfo: PropTypes.string.isRequired,
    totalAmount: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  onShowDetails: PropTypes.func.isRequired,
  onPrintInvoice: PropTypes.func.isRequired,
  onTrackShipment: PropTypes.func.isRequired
};

export default OrderItem;