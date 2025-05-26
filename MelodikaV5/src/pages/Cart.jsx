import React, { useState, useEffect } from 'react';
import CartItems from '../components/CartItems';
import CartSummary from '../components/CartSummary';
import CheckoutForm from '../components/CheckoutForm';
import OrderConfirmation from '../components/OrderConfirmation';
import Notification from '../components/Notification';
import { productsData as products } from '../pages/ProductDetails';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [currentStep, setCurrentStep] = useState('cart'); // 'cart', 'checkout', 'confirmation'
  const [orderNumber, setOrderNumber] = useState('');
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Warenkorb initialisieren
  useEffect(() => {
    loadCart();
  }, []);

  // Animation aktivieren
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); // Aktivieren der Animation
  }, []);

  // Warenkorb aus localStorage laden
  const loadCart = () => {
    try {
      const oldCart = JSON.parse(localStorage.getItem('cart')) || [];
      const melodikaCart = JSON.parse(localStorage.getItem('melodikaCart')) || [];
      
      let loadedCart = [];
      if (oldCart.length > 0 && melodikaCart.length === 0) {
        oldCart.forEach(item => {
          const matchedProduct = products.find(p => p.name === item.name);
          if (matchedProduct) {
            loadedCart.push({
              id: matchedProduct.id,
              quantity: item.quantity
            });
          }
        });
        localStorage.setItem('melodikaCart', JSON.stringify(loadedCart));
        localStorage.removeItem('cart');
      } else {
        loadedCart = melodikaCart;
      }
      setCart(loadedCart);
    } catch (error) {
      console.error('Fehler beim Laden des Warenkorbs:', error);
      setCart([]);
    }
  };

  // Warenkorb speichern
  const saveCart = (newCart) => {
    try {
      localStorage.setItem('melodikaCart', JSON.stringify(newCart));
      setCart(newCart);
    } catch (error) {
      console.error('Fehler beim Speichern des Warenkorbs:', error);
    }
  };

  // Benachrichtigung anzeigen
  const showNotification = (message, isSuccess = true) => {
    setNotification({ message, isSuccess });
    setTimeout(() => setNotification(null), 3000);
  };

  // Produkt zum Warenkorb hinzufügen
  const addToCart = (productId, quantity = 1) => {
    const existingItem = cart.find(item => item.id === productId);
    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { id: productId, quantity }];
    }
    saveCart(newCart);

    const product = products.find(p => p.id === productId);
    showNotification(`${product?.name} wurde zum Warenkorb hinzugefügt`);
  };

  // Produkt entfernen
  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);

    const product = products.find(p => p.id === productId);
    showNotification(`${product?.name} wurde aus dem Warenkorb entfernt`);
  };

  // Menge aktualisieren
  const updateQuantity = (productId, change) => {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      const newCart = cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      saveCart(newCart);
    }
  };

  // Menge setzen
  const setQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    );
    saveCart(newCart);
  };

  // Checkout starten
  const startCheckout = () => {
    setCurrentStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Zurück zum Warenkorb
  const backToCart = () => {
    setCurrentStep('cart');
  };

  // Bestellung abschließen
  const completeOrder = (orderData) => {
    const newOrderNumber = 'MD-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString('de-DE');
    const subtotal = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    const shipping = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + shipping;

    const orderProducts = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return {
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      };
    });

    const order = {
      orderNumber: newOrderNumber,
      orderDate,
      status: 'pending',
      statusText: 'In Bearbeitung',
      products: orderProducts,
      customer: orderData.customer,
      address: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentInfo: orderData.paymentInfo,
      shippingInfo: orderData.deliveryNotes || 'Standard-Lieferung',
      totalAmount: total.toFixed(2).replace('.', ',') + ' €'
    };

    try {
      const orderHistory = JSON.parse(localStorage.getItem('melodikaOrderHistory')) || [];
      orderHistory.push(order);
      localStorage.setItem('melodikaOrderHistory', JSON.stringify(orderHistory));
    } catch (error) {
      console.error('Fehler beim Speichern der Bestellung:', error);
    }

    setCart([]);
    localStorage.removeItem('melodikaCart');
    localStorage.removeItem('cart');
    setOrderNumber(newOrderNumber);
    setCurrentStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Berechnungen
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  return (
    <main className={`cart-page ${isVisible ? 'visible' : ''}`}>
      <section className={`page-hero fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="hero-content">
          <h1>Warenkorb</h1>
          <p>Ihre ausgewählten Produkte</p>
        </div>
      </section>

      {currentStep === 'cart' && (
        <section className={`cart-section fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="cart-container">
            <div className="cart-header">
              <h2>Ihre Artikel</h2>
            </div>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Ihr Warenkorb ist leer.</p>
                <a href="/produkte" className="cta-button">Produkte entdecken</a>
              </div>
            ) : (
              <>
                <CartItems
                  cart={cart}
                  products={products}
                  onUpdateQuantity={updateQuantity}
                  onSetQuantity={setQuantity}
                  onRemoveItem={removeFromCart}
                />
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  onCheckout={startCheckout}
                />
              </>
            )}
          </div>
        </section>
      )}

      {currentStep === 'checkout' && (
        <CheckoutForm
          total={total}
          onBackToCart={backToCart}
          onCompleteOrder={completeOrder}
        />
      )}

      {currentStep === 'confirmation' && (
        <OrderConfirmation orderNumber={orderNumber} />
      )}

      {notification && (
        <Notification
          message={notification.message}
          isSuccess={notification.isSuccess}
          onClose={() => setNotification(null)}
        />
      )}
    </main>
  );
};

export default Cart;
