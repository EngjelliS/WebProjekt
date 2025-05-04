document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const theme = localStorage.getItem('theme');

    // Apply saved theme or default to light mode
    if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    darkModeToggle.addEventListener('click', function() {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle button text
        darkModeToggle.textContent = newTheme === 'dark' ? '🌓' : '🌓';
    });

    // Hamburger Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
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

    // Intersection Observer for animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for header background
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.page-header-parallax');
        if (parallax) {
            let scrollPosition = window.pageYOffset;
            parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 60, // Adjust for nav height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});