document.addEventListener('DOMContentLoaded', function() {
    // Referenzen zu DOM-Elementen
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const orderDetailModal = document.getElementById('orderDetailModal');
    const closeModalButton = document.getElementById('closeModal');
    const modalBody = document.getElementById('modalBody');
    const notification = document.getElementById('notification');
    const closeNotificationButton = document.getElementById('closeNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const ordersList = document.getElementById('orders-list');
    const noOrders = document.getElementById('no-orders');
    
    // Check for dark mode preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Setze das Thema basierend auf den Präferenzen
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Füge Fade-In-Effekt für Elemente hinzu
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Zeige/Verstecke Scroll-to-Top-Button basierend auf Scroll-Position
    function handleScroll() {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('visible');
            document.querySelector('.nav-container').classList.add('scrolled');
        } else {
            scrollToTopButton.classList.remove('visible');
            document.querySelector('.nav-container').classList.remove('scrolled');
        }
    }
    
    // Event-Listener für Scroll-Event
    window.addEventListener('scroll', handleScroll);
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animation für Theme-Wechsel
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
    
    // Scroll to Top
    scrollToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Öffne Modal bei Klick auf "Details"-Button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('secondary') && e.target.classList.contains('action-button')) {
            const orderId = e.target.getAttribute('data-order');
            openOrderModal(orderId);
        }
    });
    
    // Öffne Modal mit Bestelldetails
    function openOrderModal(orderId) {
        // Hole Bestelldetails aus dem localStorage
        const orderDetails = getOrderDetails(orderId);
        
        // Wenn keine Bestelldetails gefunden wurden, zeige eine Benachrichtigung
        if (!orderDetails || !orderDetails.orderNumber) {
            showNotification('Bestellung nicht gefunden.');
            return;
        }
        
        // Setze den Modal-Inhalt
        modalBody.innerHTML = `
            <div class="modal-order-info">
                <h4>Bestellnummer: ${orderDetails.orderNumber}</h4>
                <p>Bestellt am: ${orderDetails.orderDate}</p>
                <div class="order-status ${orderDetails.status}">
                    <span>${orderDetails.statusText}</span>
                </div>
            </div>
            
            <div class="modal-section">
                <h4>Produkte</h4>
                <div class="modal-products">
                    ${orderDetails.products.map(product => `
                        <div class="modal-product">
                            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='placeholder.jpg'">
                            <div class="product-details">
                                <span class="product-name">${product.name}</span>
                                <span class="product-price">${product.price}</span>
                                <span class="product-quantity">Menge: ${product.quantity}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h4>Lieferadresse</h4>
                <p>${orderDetails.address.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="modal-section">
                <h4>Zahlungsart</h4>
                <p>${orderDetails.paymentMethod}</p>
                ${orderDetails.paymentInfo ? `<p class="payment-info">${orderDetails.paymentInfo}</p>` : ''}
            </div>
            
            <div class="modal-section">
                <h4>Lieferinformationen</h4>
                <p>${orderDetails.shippingInfo}</p>
            </div>
            
            ${orderDetails.status === 'pending' ? `
                <div class="modal-section">
                    <h4>Lieferstatus</h4>
                    <div class="tracking-info">
                        <div class="tracking-timeline">
                            <div class="tracking-step completed">
                                <div class="step-indicator"></div>
                                <div class="step-content">
                                    <span class="step-date">${orderDetails.orderDate}</span>
                                    <span class="step-title">Bestellung aufgegeben</span>
                                </div>
                            </div>
                            <div class="tracking-step completed">
                                <div class="step-indicator"></div>
                                <div class="step-content">
                                    <span class="step-date">${getNextDay(orderDetails.orderDate)}</span>
                                    <span class="step-title">Bestellung bearbeitet</span>
                                </div>
                            </div>
                            <div class="tracking-step active">
                                <div class="step-indicator"></div>
                                <div class="step-content">
                                    <span class="step-date">Heute</span>
                                    <span class="step-title">Versand vorbereitet</span>
                                </div>
                            </div>
                            <div class="tracking-step">
                                <div class="step-indicator"></div>
                                <div class="step-content">
                                    <span class="step-date">Ausstehend</span>
                                    <span class="step-title">Unterwegs</span>
                                </div>
                            </div>
                            <div class="tracking-step">
                                <div class="step-indicator"></div>
                                <div class="step-content">
                                    <span class="step-date">Ausstehend</span>
                                    <span class="step-title">Zugestellt</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <div class="modal-section">
                <h4>Gesamtsumme</h4>
                <p class="modal-total">${orderDetails.totalAmount}</p>
            </div>
        `;
        
        // Zeige das Modal an
        orderDetailModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Verhindere Scrollen im Hintergrund
        
        // Animation für das Einblenden
        setTimeout(() => {
            orderDetailModal.querySelector('.modal-content').classList.add('active');
        }, 10);
    }
    
    // Hilfsfunktion zur Berechnung des nächsten Tages für das Tracking
    function getNextDay(dateString) {
        // Erwartetes Format: DD.MM.YYYY
        const parts = dateString.split('.');
        const date = new Date(parts[2], parts[1] - 1, parts[0]);
        date.setDate(date.getDate() + 1);
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}.${month}.${year}`;
    }
    
    // Schließe Modal
    closeModalButton.addEventListener('click', closeModal);
    
    orderDetailModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    function closeModal() {
        orderDetailModal.querySelector('.modal-content').classList.remove('active');
        setTimeout(() => {
            orderDetailModal.style.display = 'none';
            document.body.style.overflow = ''; // Erlaube wieder Scrollen im Hintergrund
        }, 300);
    }
    
    // Funktion zum Abrufen der Bestelldetails aus dem localStorage
    function getOrderDetails(orderId) {
        const orderHistory = JSON.parse(localStorage.getItem('melodikaOrderHistory')) || [];
        return orderHistory.find(order => order.orderNumber === orderId) || null;
    }
    
    // Event-Listener für Rechnung-Button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('action-button') && !e.target.classList.contains('secondary') && !e.target.classList.contains('track-button')) {
            const orderId = e.target.getAttribute('data-order');
            printInvoice(orderId);
        }
    });
    
    // Funktion zum "Drucken" der Rechnung
    function printInvoice(orderId) {
        // In einer echten Anwendung würde hier eine Rechnung generiert und gedruckt/heruntergeladen werden
        showNotification(`Rechnung für Bestellung ${orderId} wird vorbereitet...`);
        
        // Simuliere einen Download oder Druckvorgang
        setTimeout(() => {
            showNotification(`Rechnung für Bestellung ${orderId} wurde erfolgreich generiert.`);
        }, 1500);
    }
    
    // Event-Listener für Sendungs-Tracking-Button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('track-button')) {
            e.target.classList.add('loading');
            const orderId = e.target.getAttribute('data-order');
            
            // Simuliere das Laden von Tracking-Informationen
            setTimeout(() => {
                e.target.classList.remove('loading');
                trackShipment(orderId);
            }, 1200);
        }
    });
    
    // Funktion zum Verfolgen einer Sendung
    function trackShipment(orderId) {
        // Öffne das Bestelldetail-Modal mit Tracking-Informationen
        openOrderModal(orderId);
        showNotification(`Sendungsverfolgung für Bestellung ${orderId} wurde aktualisiert.`);
    }
    
    // Funktion zum Anzeigen von Benachrichtigungen
    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        // Automatisch ausblenden nach einigen Sekunden
        setTimeout(() => {
            hideNotification();
        }, 5000);
    }
    
    // Funktion zum Ausblenden von Benachrichtigungen
    function hideNotification() {
        notification.classList.remove('show');
    }
    
    // Event-Listener zum Schließen der Benachrichtigung
    closeNotificationButton.addEventListener('click', hideNotification);
    
    // Überprüfe, ob Bestellungen vorhanden sind
    function checkOrders() {
        const orderItems = ordersList.querySelectorAll('.order-item');
        
        if (orderItems.length === 0) {
            ordersList.style.display = 'none';
            noOrders.style.display = 'block';
        } else {
            ordersList.style.display = 'block';
            noOrders.style.display = 'none';
        }
    }
    
    // Event-Listener für Escape-Taste zum Schließen des Modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && orderDetailModal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Initialen Scroll-Status prüfen
    handleScroll();
    
    // Funktion zum Laden der Bestellungen aus dem localStorage
    function loadOrdersFromStorage() {
    const orderHistory = JSON.parse(localStorage.getItem('melodikaOrderHistory')) || [];
    
    // Wenn keine Bestellungen vorhanden sind, Meldung anzeigen
    if (orderHistory.length === 0) {
        ordersList.style.display = 'none';
        noOrders.style.display = 'block';
        return;
    }
    
    // Bestellungen anzeigen
    ordersList.innerHTML = '';
    noOrders.style.display = 'none';
    
    // Bestellungen in umgekehrter Reihenfolge anzeigen (neueste zuerst)
    orderHistory.reverse().forEach(order => {
        const orderHtml = `
            <div class="order-item fade-in">
                <div class="order-header">
                    <div class="order-info">
                        <span class="order-number">Bestellnummer: ${order.orderNumber}</span>
                        <span class="order-date">Bestellt am: ${order.orderDate}</span>
                    </div>
                    <div class="order-status ${order.status}">
                        <span>${order.statusText}</span>
                    </div>
                </div>
                <div class="order-products">
                    ${order.products.map(product => `
                        <div class="order-product">
                            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='placeholder.jpg'">
                            <div class="product-details">
                                <span class="product-name">${product.name}</span>
                                <span class="product-price">${product.price}</span>
                                <span class="product-quantity">Menge: ${product.quantity}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-details">
                    <div class="order-address">
                        <h4>Lieferadresse</h4>
                        <p>${order.address ? order.address.replace(/\n/g, '<br>') : 'Keine Adresse verfügbar'}</p>
                    </div>
                    <div class="order-payment">
                        <h4>Zahlungsart</h4>
                        <p>${order.paymentMethod}</p>
                        ${order.paymentInfo ? `<p class="payment-info">${order.paymentInfo}</p>` : ''}
                    </div>
                    <div class="order-shipping">
                        <h4>Lieferinformationen</h4>
                        <p>${order.shippingInfo}</p>
                    </div>
                </div>
                <div class="order-footer">
                    <div class="order-total">
                        <span>Gesamtsumme: <strong>${order.totalAmount}</strong></span>
                    </div>
                    <div class="order-actions">
                        ${order.status === 'completed' ? 
                            `<button class="action-button" data-order="${order.orderNumber}">Rechnung</button>` : 
                            `<button class="action-button track-button" data-order="${order.orderNumber}">Sendung verfolgen</button>`
                        }
                        <button class="action-button secondary" data-order="${order.orderNumber}">Details</button>
                    </div>
                </div>
            </div>
        `;
        
        ordersList.innerHTML += orderHtml;
    });
    
    // Animation für neue Bestellungen hinzufügen
    document.querySelectorAll('.order-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        setTimeout(() => {
            item.classList.add('visible');
        }, 100 + (index * 100));
    });
    
    // Bestellliste anzeigen
    ordersList.style.display = 'block';
}
    
    // Hauptfunktion zum Laden der Bestellungen
    function loadOrders() {
        // Bestellungen aus dem localStorage laden
        loadOrdersFromStorage();
        
        // Überprüfe, ob Bestellungen vorhanden sind
        checkOrders();
    }
    
    // Lade Bestellungen beim Start
    loadOrders();
    
    // Event-Delegation für alle Action-Buttons (auch neu geladene)
    document.addEventListener('click', function(e) {
        // Sekundäre Buttons (Details)
        if (e.target.classList.contains('secondary') && e.target.classList.contains('action-button')) {
            const orderId = e.target.getAttribute('data-order');
            openOrderModal(orderId);
        }
        
        // Rechnungs-Buttons
        if (e.target.classList.contains('action-button') && !e.target.classList.contains('secondary') && !e.target.classList.contains('track-button')) {
            const orderId = e.target.getAttribute('data-order');
            printInvoice(orderId);
        }
        
        // Tracking-Buttons
        if (e.target.classList.contains('track-button')) {
            e.target.classList.add('loading');
            const orderId = e.target.getAttribute('data-order');
            
            setTimeout(() => {
                e.target.classList.remove('loading');
                trackShipment(orderId);
            }, 1200);
        }
    });
    
    // Funktion zum Löschen aller Bestellungen (für Testzwecke)
    window.clearAllOrders = function() {
        localStorage.removeItem('melodikaOrderHistory');
        loadOrders();
        showNotification('Alle Bestellungen wurden gelöscht.');
    };
}); 