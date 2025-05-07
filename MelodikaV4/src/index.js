document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const currentTheme = localStorage.getItem('theme');

    // Set initial theme based on local storage
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    darkModeToggle.addEventListener('click', function() {
        // Toggle between light and dark
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Set the new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
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
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    scrollToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax Effect
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.hero-parallax');
        if (parallax) {
            let scrollPosition = window.pageYOffset;
            parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check for visible elements
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Product Slider Navigation
    const slides = document.querySelectorAll('.slide');
    const slideRadios = document.querySelectorAll('input[name="slider"]');
    
    if (slides.length > 0 && slideRadios.length > 0) {
        // Auto slide functionality
        let currentSlide = 0;
        
        function autoSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            slideRadios[currentSlide].checked = true;
        }
        
        // Change slide every 5 seconds
        setInterval(autoSlide, 5000);
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 60,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (hamburger && hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // Add parallax effect to product images on scroll
    const productImages = document.querySelectorAll('.product-image');
    
    window.addEventListener('scroll', function() {
        productImages.forEach(image => {
            const imagePosition = image.getBoundingClientRect();
            
            // Only apply effect when image is in viewport
            if (imagePosition.top < window.innerHeight && imagePosition.bottom > 0) {
                const scrollPosition = window.pageYOffset;
                const speed = 0.05; // Adjust for more or less movement
                
                image.style.transform = `translateY(${scrollPosition * speed}px) scale(1)`;
            }
        });
    });
    
    // Transparent to solid navbar transition on scroll
    const navbar = document.querySelector('.nav-container');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'var(--background-primary)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(var(--background-primary), 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Initialize header with correct background opacity
    if (window.scrollY <= 50) {
        navbar.style.backgroundColor = 'rgba(var(--background-primary), 0.8)';
    }
    
    // Magnetic hover effect for buttons
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate position relative to center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const offsetX = (x - centerX) / 15;
            const offsetY = (y - centerY) / 15;
            
            this.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // Animated gradient background effect 
    const brandPromise = document.querySelector('.brand-promise');
    
    if (brandPromise) {
        let gradientPosition = 0;
        
        function animateGradient() {
            gradientPosition += 0.5;
            const gradientValue = `linear-gradient(${gradientPosition}deg, var(--gradient-start), var(--gradient-end))`;
            brandPromise.style.background = gradientValue;
            
            requestAnimationFrame(animateGradient);
        }
        
        animateGradient();
    }
    
    // iOS-style inertia scrolling effect for product gallery
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = document.querySelector('.gallery-grid');
    
    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});