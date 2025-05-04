document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere Dark Mode
    initDarkMode();
    
    // Animationen beim Scrollen
    initScrollAnimations();
    
    // Scroll-to-Top Button
    initScrollToTop();
    
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Kontaktformular
    initContactForm();
});

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Prüfe, ob der Benutzer bereits eine Einstellung hat
    let currentTheme = localStorage.getItem('theme');
    
    // Falls eine Präferenz gespeichert wurde, wende sie an
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        // Oder verwende die Systemeinstellung
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    
    // Toggle-Button-Funktionalität
    darkModeToggle.addEventListener('click', function() {
        let theme = document.body.getAttribute('data-theme');
        
        if (theme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Scroll-Animationen
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Observer für Fade-In-Elemente
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Nur einmal animieren
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Element muss zu 15% sichtbar sein
        rootMargin: '0px'
    });
    
    // Beobachten aller Fade-In-Elemente
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Für Browser ohne IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        fadeElements.forEach(element => {
            element.classList.add('appear');
        });
    }
}

// Scroll-to-Top Button
function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Kontaktformular
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Einfache Formularvalidierung
            let valid = true;
            const inputFields = this.querySelectorAll('input, textarea');
            
            inputFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = '#ff3b30';
                } else {
                    field.style.borderColor = 'var(--border-color)';
                }
            });
            
            if (valid) {
                // Formularverarbeitung simulieren
                const submitButton = this.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Wird gesendet...';
                submitButton.disabled = true;
                
                // Simuliere eine Verzögerung für die Verarbeitung
                setTimeout(() => {
                    // Formular zurücksetzen
                    this.reset();
                    
                    // Erfolgsmeldung
                    alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
                    
                    // Button wiederherstellen
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            } else {
                alert('Bitte füllen Sie alle Felder aus.');
            }
        });
    }
    
    // FAQ-Elemente verbessern
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Schließe alle anderen offenen FAQ-Elemente
                faqItems.forEach(otherItem => {
                    if (otherItem !== this && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });
}

// Hilfefunktion für die Verzögerung
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}