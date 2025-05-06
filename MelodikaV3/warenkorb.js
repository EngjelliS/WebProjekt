// Warenkorb Funktionalität für Melodika Shop
document.addEventListener('DOMContentLoaded', function() {
    // --------- GRUNDLEGENDE SETUP ---------
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Prüfen, ob bereits ein Theme gespeichert ist
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    
    darkModeToggle.addEventListener('click', function() {
        const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Scroll to Top Button
    const scrollButton = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // --------- WARENKORB FUNKTIONALITÄT ---------
    // Produktdaten
    const products = [
        { id: 1, name: "Studiokopfhörer AudioPro HD", price: 149.99, image: "Produkt1.jpeg" },
        { id: 2, name: "Mikrofonstativ FlexiMic Stand", price: 34.99, image: "Produkt2.jpeg" },
        { id: 3, name: "Gitarren-Tuner TuneMate Pro", price: 19.99, image: "Produkt3.jpeg" },
        { id: 4, name: "Digitales Metronom TempoMaster Pro", price: 39.99, image: "Produkt4.jpeg" },
        { id: 5, name: "Keyboard-Pedal ProSustain FX", price: 24.99, image: "Produkt5.jpeg" },
        { id: 6, name: "Gitarren-Effektpedal RockRiot Distortion X", price: 59.99, image: "Produkt6.jpeg" }
    ];
    
    // WICHTIG: Prüfen ob alte Cart-Format oder neues melodikaCart-Format
    let cart = [];
    const oldCart = JSON.parse(localStorage.getItem('cart')) || [];
    const melodikaCart = JSON.parse(localStorage.getItem('melodikaCart')) || [];
    
    // Migration von altem Format zu neuem Format, wenn nötig
    if (oldCart.length > 0 && melodikaCart.length === 0) {
        // Konvertieren zum neuen Format
        oldCart.forEach(item => {
            // Finde passende Produkt-ID zum Namen
            const matchedProduct = products.find(p => p.name === item.name);
            if (matchedProduct) {
                cart.push({
                    id: matchedProduct.id,
                    quantity: item.quantity
                });
            }
        });
        // Speichern im neuen Format
        localStorage.setItem('melodikaCart', JSON.stringify(cart));
        // Altes Format löschen
        localStorage.removeItem('cart');
    } else {
        cart = melodikaCart;
    }
    
    // DOM-Elemente
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutTotalElement = document.getElementById('checkout-total');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutSection = document.getElementById('checkout-section');
    const cartSection = document.getElementById('cart-section');
    const orderConfirmation = document.getElementById('order-confirmation');
    const backToCartButton = document.getElementById('back-to-cart');
    const checkoutForm = document.getElementById('checkout-form');
    const sameAddressCheckbox = document.getElementById('same-address');
    const billingAddressFields = document.getElementById('billing-address-fields');
    const paymentSelect = document.getElementById('payment-method'); // Umbenannt von paymentMethod für Konsistenz
    const creditCardFields = document.getElementById('credit-card-fields');
    const orderNumberElement = document.getElementById('order-number');
    
    // Hilfsfunktionen
    function formatCurrency(amount) {
        return amount.toFixed(2).replace('.', ',') + ' €';
    }
    
    function showNotification(message, isSuccess = true) {
        // Bestehende Benachrichtigungen entfernen
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Neue Benachrichtigung erstellen
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${isSuccess ? '✓' : '!'}</span>
                <p class="notification-message">${message}</p>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Animation starten
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Benachrichtigung nach 3 Sekunden ausblenden
        const timeout = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Close Button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(timeout);
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    function updateCartUI() {
        // Warenkorb im localStorage speichern
        localStorage.setItem('melodikaCart', JSON.stringify(cart));
        
        // Leeren Warenkorb anzeigen oder ausblenden
        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block';
            cartItemsContainer.style.display = 'none';
            cartSummary.style.display = 'none';
        } else {
            cartEmptyMessage.style.display = 'none';
            cartItemsContainer.style.display = 'block';
            cartSummary.style.display = 'block';
            
            // Warenkorb-Elemente rendern
            renderCartItems();
            
            // Zusammenfassung aktualisieren
            updateCartSummary();
        }
    }
    
    function renderCartItems() {
        // Warenkorb-Items Container leeren
        cartItemsContainer.innerHTML = '';
        
        // Elemente zum Container hinzufügen
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            
            const itemSubtotal = product.price * item.quantity;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="item-image" onerror="this.src='placeholder.jpg'">
                <div class="item-details">
                    <h3 class="item-name">${product.name}</h3>
                    <p class="item-price">${formatCurrency(product.price)}</p>
                    <div class="item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                            <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-id="${product.id}">
                            <button class="quantity-btn increase" data-id="${product.id}">+</button>
                        </div>
                        <button class="remove-btn" data-id="${product.id}">
                            <svg class="remove-icon" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                            Entfernen
                        </button>
                    </div>
                </div>
                <div class="item-subtotal">${formatCurrency(itemSubtotal)}</div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement); 
            
            // Event-Listener für dieses Element hinzufügen
            const quantityDecrease = cartItemElement.querySelector('.decrease');
            const quantityIncrease = cartItemElement.querySelector('.increase');
            const quantityInput = cartItemElement.querySelector('.quantity-input');
            const removeButton = cartItemElement.querySelector('.remove-btn');
            
            quantityDecrease.addEventListener('click', () => {
                updateQuantity(product.id, -1);
            });
            
            quantityIncrease.addEventListener('click', () => {
                updateQuantity(product.id, 1);
            });
            
            quantityInput.addEventListener('change', () => {
                const newQuantity = parseInt(quantityInput.value, 10);
                if (isNaN(newQuantity) || newQuantity < 1) {
                    quantityInput.value = item.quantity;
                    return;
                }
                setQuantity(product.id, newQuantity);
            });
            
            removeButton.addEventListener('click', () => {
                removeFromCart(product.id);
            });
        });
    }
    
    function updateCartSummary() {
        // Zwischensumme berechnen
        const subtotal = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
        
        // Versandkosten (könnten auch vom Bestellwert abhängig sein)
        const shipping = subtotal > 0 ? 4.99 : 0;
        
        // Gesamtsumme
        const total = subtotal + shipping;
        
        // UI aktualisieren
        subtotalElement.textContent = formatCurrency(subtotal);
        document.getElementById('shipping').textContent = shipping > 0 ? formatCurrency(shipping) : 'Kostenlos';
        totalElement.textContent = formatCurrency(total);
        
        // Checkout-Total aktualisieren, falls vorhanden
        if (checkoutTotalElement) {
            checkoutTotalElement.textContent = formatCurrency(total);
        }
    }
    
    function addToCart(productId, quantity = 1) {
        // Prüfen, ob Produkt bereits im Warenkorb ist
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            // Menge erhöhen, wenn Produkt bereits vorhanden
            existingItem.quantity += quantity;
        } else {
            // Neues Produkt zum Warenkorb hinzufügen
            cart.push({ id: productId, quantity });
        }
        
        // UI aktualisieren
        updateCartUI();
        
        // Benachrichtigung anzeigen
        const product = products.find(p => p.id === productId);
        showNotification(`${product.name} wurde zum Warenkorb hinzugefügt`);
    }
    
    function removeFromCart(productId) {
        // Produkt aus dem Warenkorb entfernen
        cart = cart.filter(item => item.id !== productId);
        
        // UI aktualisieren
        updateCartUI();
        
        // Benachrichtigung anzeigen
        const product = products.find(p => p.id === productId);
        showNotification(`${product.name} wurde aus dem Warenkorb entfernt`);
    }
    
    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (!item) return;
        
        const newQuantity = item.quantity + change;
        
        if (newQuantity < 1) {
            // Produkt entfernen, wenn Menge < 1
            removeFromCart(productId);
        } else {
            // Menge aktualisieren
            item.quantity = newQuantity;
            updateCartUI();
        }
    }
    
    function setQuantity(productId, quantity) {
        const item = cart.find(item => item.id === productId);
        if (!item) return;
        
        item.quantity = quantity;
        updateCartUI();
    }
    
    // Hilfsfunktion zum Abrufen des aktuellen Datums im Format DD.MM.YYYY
    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}.${month}.${year}`;
    }
    
    // Event-Listener für Checkout-Prozess
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            cartSection.style.display = 'none';
            checkoutSection.style.display = 'block';
            checkoutSection.classList.add('fade-in');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (backToCartButton) {
        backToCartButton.addEventListener('click', () => {
            checkoutSection.style.display = 'none';
            cartSection.style.display = 'block';
        });
    }
    
    if (sameAddressCheckbox) {
        sameAddressCheckbox.addEventListener('change', () => {
            billingAddressFields.style.display = sameAddressCheckbox.checked ? 'none' : 'block';
        });
    }
    
    if (paymentSelect) {
        paymentSelect.addEventListener('change', () => {
            creditCardFields.style.display = paymentSelect.value === 'credit-card' ? 'block' : 'none';
        });
    }
    
    if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Alle Bestellinformationen sammeln
        const formData = new FormData(checkoutForm);
        
        // Zufällige Bestellnummer generieren
        const orderNumber = 'MD-' + Math.floor(100000 + Math.random() * 900000);
        
        // Heutige Datum im Format DD.MM.YYYY
        const orderDate = getCurrentDate();
        
        // Berechnung der Gesamtsumme
        const subtotal = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
        const shipping = subtotal > 0 ? 4.99 : 0;
        const total = subtotal + shipping;
        
        // Produkte für die Bestelldetails vorbereiten
        const orderProducts = [];
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                orderProducts.push({
                    name: product.name,
                    price: formatCurrency(product.price),
                    quantity: item.quantity,
                    image: product.image
                });
            }
        });
        
        // Kundendaten sammeln
        const email = formData.get('email') || '';
        const phone = formData.get('phone') || '';
        
        // Versandadresse formatieren
        // WICHTIG: Auf die richtigen IDs aus dem HTML-Formular zugreifen
        const firstName = formData.get('delivery-name') || '';
        // Namen in Vor- und Nachname aufteilen (falls als ein Feld eingegeben)
        const nameParts = firstName.split(' ');
        const lastName = nameParts.length > 1 ? nameParts.pop() : '';
        const firstNameOnly = nameParts.join(' ');
        
        const address = formData.get('delivery-street') || '';
        const city = formData.get('delivery-city') || '';
        const zip = formData.get('delivery-zip') || '';
        const country = formData.get('delivery-country') || 'Deutschland';
        
        const shippingAddress = `${firstName}\n${address}\n${zip} ${city}\n${country}`;
        
        // Rechnungsadresse (entweder dieselbe wie Versandadresse oder separate)
        let billingAddress = shippingAddress;
        if (!sameAddressCheckbox.checked) {
            const bName = formData.get('billing-name') || '';
            const bAddr = formData.get('billing-street') || '';
            const bCity = formData.get('billing-city') || '';
            const bZip = formData.get('billing-zip') || '';
            const bCountry = formData.get('billing-country') || 'Deutschland';
            billingAddress = `${bName}\n${bAddr}\n${bZip} ${bCity}\n${bCountry}`;
        }
        
        // Zahlungsmethode und Info
        let paymentMethodText = '';
        let paymentInfo = '';
        
        switch (paymentSelect.value) {
            case 'credit-card':
                paymentMethodText = 'Kreditkarte';
                const ccNumber = formData.get('cc-number') || '';
                // Zeige nur die letzten 4 Ziffern der Kreditkartennummer
                const lastFourDigits = ccNumber.replace(/\s/g, '').slice(-4);
                paymentInfo = `**** **** **** ${lastFourDigits}`;
                break;
            case 'paypal':
                paymentMethodText = 'PayPal';
                paymentInfo = email;
                break;
            case 'instant-transfer':
                paymentMethodText = 'Sofortüberweisung';
                paymentInfo = '';
                break;
            case 'invoice':
                paymentMethodText = 'Rechnung';
                paymentInfo = '';
                break;
            default:
                paymentMethodText = 'Unbekannt';
        }
        
        // Lieferhinweise
        const shippingInfo = formData.get('delivery-notes') || 'Standard-Lieferung';
        
        // Bestellobjekt erstellen
        const order = {
            orderNumber: orderNumber,
            orderDate: orderDate,
            status: 'pending',
            statusText: 'In Bearbeitung',
            products: orderProducts,
            customer: {
                email: email,
                phone: phone,
                fullName: firstName
            },
            address: shippingAddress,
            billingAddress: billingAddress,
            paymentMethod: paymentMethodText,
            paymentInfo: paymentInfo,
            shippingInfo: shippingInfo,
            totalAmount: formatCurrency(total)
        };
        
        // Bestellung zum Bestellverlauf hinzufügen
        const orderHistory = JSON.parse(localStorage.getItem('melodikaOrderHistory')) || [];
        orderHistory.push(order);
        localStorage.setItem('melodikaOrderHistory', JSON.stringify(orderHistory));
        
        // Bestellnummer auf der Bestätigungsseite anzeigen
        orderNumberElement.textContent = orderNumber;
        
        // Warenkorb leeren
        cart = [];
        localStorage.removeItem('melodikaCart');
        localStorage.removeItem('cart'); // Alte Daten auch löschen
        
        // Bestätigungsseite anzeigen
        checkoutSection.style.display = 'none';
        orderConfirmation.style.display = 'block';
        orderConfirmation.classList.add('fade-in');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
    
    // Initialisierung des Warenkorbs
    updateCartUI();
    
    // Platzhalterbilder für fehlende Produktbilder
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'placeholder.jpg';
        });
    });
    
    // --------- ANIMATION UND UI EFFEKTE ---------
    // Fade-In Animation für Seitenelemente
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${0.2 + index * 0.1}s`;
    });
    
    // Input-Validierung für Formularfelder (einfache Version)
    const formInputs = document.querySelectorAll('input[required], select[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        input.addEventListener('focus', () => {
            input.classList.remove('error');
        });
    });
    
    // Eingabemaske für Kreditkartendaten
    const ccNumber = document.getElementById('cc-number');
    if (ccNumber) {
        ccNumber.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            this.value = formattedValue.substring(0, 19); // Limit auf 16 Ziffern + 3 Leerzeichen
        });
    }
    
    const ccExpiry = document.getElementById('cc-expiry');
    if (ccExpiry) {
        ccExpiry.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 2) {
                this.value = value.substring(0, 2) + '/' + value.substring(2, 4);
            } else {
                this.value = value;
            }
        });
    }
    
    // Smooth Scroll für Page Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Für die Produkt-Seite: Event-Listener für "In den Warenkorb" Buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'), 10);
            if (!isNaN(productId)) {
                addToCart(productId);
            }
        });
    });
});
