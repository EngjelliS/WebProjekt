import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TrackingTimeline from './TrackingTimeline';

const OrderModal = ({ order, isOpen, onClose }) => {
    const formatCurrency = (amount) => {
        return amount.toFixed(2).replace('.', ',') + ' €';
    };
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getNextDay = (dateString) => {
    const parts = dateString.split('.');
    const date = new Date(parts[2], parts[1] - 1, parts[0]);
    date.setDate(date.getDate() + 1);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="order-detail-modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Bestelldetails</h3>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <div className="modal-body">
          <div className="modal-order-info">
            <h4>Bestellnummer: {order.orderNumber}</h4>
            <p>Bestellt am: {order.orderDate}</p>
            <div className={`order-status ${order.status}`}>
              <span>{order.statusText}</span>
            </div>
          </div>
          
          <div className="modal-section">
            <h4>Produkte</h4>
            <div className="modal-products">
              {order.products?.map((product, index) => (
                <div key={index} className="modal-product">
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
          </div>
          
          <div className="modal-section">
            <h4>Lieferadresse</h4>
            <p dangerouslySetInnerHTML={{ 
              __html: order.address ? order.address.replace(/\n/g, '<br>') : 'Keine Adresse verfügbar' 
            }} />
          </div>
          
          <div className="modal-section">
            <h4>Zahlungsart</h4>
            <p>{order.paymentMethod}</p>
            {order.paymentInfo && (
              <p className="payment-info">{order.paymentInfo}</p>
            )}
          </div>
          
          <div className="modal-section">
            <h4>Lieferinformationen</h4>
            <p>{order.shippingInfo}</p>
          </div>
          
          {order.status === 'pending' && (
            <div className="modal-section">
              <h4>Lieferstatus</h4>
              <TrackingTimeline 
                orderDate={order.orderDate}
                getNextDay={getNextDay}
              />
            </div>
          )}
          
          <div className="modal-section">
            <h4>Gesamtsumme</h4>
            <p className="modal-total">{order.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderModal.propTypes = {
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
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default OrderModal;