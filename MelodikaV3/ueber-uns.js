// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
    }
    
    // Toggle dark/light mode
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Mobile Navigation Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll Animation
    function checkVisibility() {
        const animationElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
        
        animationElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check for visible elements
    checkVisibility();
    
    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-parallax');
    
    window.addEventListener('scroll', function() {
        if (heroSection) {
            const scrollPosition = window.pageYOffset;
            // Apply parallax effect by adjusting background position
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
    
    // Handle link clicks for smooth scrolling to anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target) || hamburgerMenu.contains(event.target);
        
        if (!isClickInsideMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    });
    
    // Add hover effect for location cards
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Preload images for better user experience
    function preloadImages() {
        const imagesToPreload = [
            'Produkt1.jpeg',
            'Produkt2.jpeg',
            'Produkt3.jpeg'
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
});