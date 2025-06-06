import React, { useState, useEffect } from 'react';
import OrderItem from '../components/OrderItem';
import OrderModal from '../components/OrderModal';
import Notification from '../components/Notification';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null); // Changed to null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      const orderHistory = JSON.parse(localStorage.getItem('melodikaOrderHistory')) || [];
      setOrders(orderHistory.reverse()); // Reverse order for newest first
    } catch (error) {
      console.error('Fehler beim Laden der Bestellungen:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const openOrderModal = (orderId) => {
    const order = orders.find(o => o.orderNumber === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsModalOpen(true);
    } else {
      showNotification('Bestellung nicht gefunden.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const printInvoice = (orderId) => {
    showNotification(`Rechnung für Bestellung ${orderId} wird vorbereitet...`);
    setTimeout(() => {
      showNotification(`Rechnung für Bestellung ${orderId} wurde erfolgreich generiert.`);
    }, 1500);
  };

  const trackShipment = (orderId) => {
    openOrderModal(orderId);
    showNotification(`Sendungsverfolgung für Bestellung ${orderId} wurde aktualisiert.`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  if (loading) {
    return (
      <main className="orders-page">
        <section className="page-hero">
          <div className="hero-content fade-in">
            <h1>Bestellübersicht</h1>
            <p>Ihre bisherigen Bestellungen werden geladen...</p>
          </div>
        </section>
      </main>
    );
  }

  window.clearAllOrders = function() {
        localStorage.removeItem('melodikaOrderHistory');
        loadOrders();
        showNotification('Alle Bestellungen wurden gelöscht.');
    };

  return (
    <main className="orders-page">
      <section className="page-hero">
        <div className="hero-content fade-in">
          <h1>Bestellübersicht</h1>
          <p>Ihre bisherigen Bestellungen</p>
        </div>
      </section>

      <section className="orders-section fade-in">
        <div className="orders-container">
          <div className="orders-header">
            <h2>Ihre Bestellungen</h2>
            <p>Eine Übersicht aller bisherigen Bestellungen</p>
          </div>

          {orders.length === 0 ? (
            <div className="no-orders">
              <p>Sie haben noch keine Bestellungen getätigt.</p>
              <a href="/produkte" className="cta-button">Produkte entdecken</a>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order, index) => (
                <OrderItem
                  key={order.orderNumber}
                  order={order}
                  index={index}
                  onShowDetails={openOrderModal}
                  onPrintInvoice={printInvoice}
                  onTrackShipment={trackShipment}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {isModalOpen && selectedOrder && (
        <OrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

      {notification && (
        <Notification
          message={notification}
          onClose={hideNotification}
        />
      )}
    </main>
  );
};

export default Orders;
