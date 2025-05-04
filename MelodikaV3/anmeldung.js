// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Tab Elements
    const tabButtons = document.querySelectorAll('.auth-tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    // Mobile Navigation
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Animation Elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');
    const scaleElements = document.querySelectorAll('.scale-in');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }
    
    // Dark Mode Functions
    function enableDarkMode() {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'enabled');
    }
    
    function disableDarkMode() {
        body.removeAttribute('data-theme');
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Dark Mode Toggle Event
    darkModeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    // Tab Switching Logic
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            
            // Remove active class from all buttons and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            authForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button and corresponding form
            button.classList.add('active');
            document.querySelector(`.${target}`).classList.add('active');
        });
    });
    
    // Form Label Animation
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(input => {
        // Set initial state based on whether the input has content
        if (input.value !== '') {
            const label = input.nextElementSibling;
            if (label && label.classList.contains('form-label')) {
                label.classList.add('active');
            }
        }
        
        // Handle focus events
        input.addEventListener('focus', () => {
            const label = input.nextElementSibling;
            if (label && label.classList.contains('form-label')) {
                label.classList.add('active');
            }
        });
        
        // Handle blur events
        input.addEventListener('blur', () => {
            if (input.value === '') {
                const label = input.nextElementSibling;
                if (label && label.classList.contains('form-label')) {
                    label.classList.remove('active');
                }
            }
        });
    });
    
    // Scroll to Top Logic
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {  // Show button after scrolling down 300px
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mobile Navigation Toggle
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                intersectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animation elements
    fadeElements.forEach(element => intersectionObserver.observe(element));
    slideElements.forEach(element => intersectionObserver.observe(element));
    scaleElements.forEach(element => intersectionObserver.observe(element));
    
    // Parallax Effect for Hero Section
    const parallaxSection = document.querySelector('.auth-hero-parallax');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (parallaxSection) {
            // Adjust the background position based on scroll
            parallaxSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
    
    // Initialize animations for elements that are already in view on page load
    setTimeout(() => {
        // Trigger initial animation check
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }, 100);
});

// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form form');
    const registerForm = document.querySelector('.register-form form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Bitte füllen Sie alle Felder aus.');
                return;
            }
            
            // Email validation
            if (!validateEmail(email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            // Password validation (at least 6 characters)
            if (password.length < 6) {
                alert('Das Passwort muss mindestens 6 Zeichen lang sein.');
                return;
            }
            
            // Here you would typically send data to a server
            console.log('Login submitted:', { email, password });
            alert('Login erfolgreich! (Simuliert)');
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const passwordConfirm = document.getElementById('reg-password-confirm').value;
            const terms = document.getElementById('terms').checked;
            
            // Basic validation
            if (!name || !email || !password || !passwordConfirm) {
                alert('Bitte füllen Sie alle Felder aus.');
                return;
            }
            
            // Email validation
            if (!validateEmail(email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            // Password validation
            if (password.length < 6) {
                alert('Das Passwort muss mindestens 6 Zeichen lang sein.');
                return;
            }
            
            // Confirm passwords match
            if (password !== passwordConfirm) {
                alert('Die Passwörter stimmen nicht überein.');
                return;
            }
            
            // Terms agreement
            if (!terms) {
                alert('Bitte stimmen Sie den Nutzungsbedingungen zu.');
                return;
            }
            
            // Here you would typically send data to a server
            console.log('Registration submitted:', { name, email, password });
            alert('Registrierung erfolgreich! (Simuliert)');
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});