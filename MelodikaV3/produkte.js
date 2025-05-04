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

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.hero-parallax');
        if (parallax) {
            let scrollPosition = window.pageYOffset;
            parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Scroll Animations for Fade-in Elements
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
    
    // Product Filter Functionality (if needed)
    const filterButtons = document.querySelectorAll('.filter-button');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                // Filter products
                productCards.forEach(card => {
                    const productCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || productCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 100);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Add to Cart Animation
    const productButtons = document.querySelectorAll('.product-button');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('add-to-cart')) {
                e.preventDefault();
                
                // Create a flying cart element
                const productCard = this.closest('.product-card');
                const productImage = productCard.querySelector('.product-image');
                const cartIcon = document.querySelector('.nav-icon-link svg');
                
                if (productImage && cartIcon) {
                    const flyingImage = document.createElement('img');
                    flyingImage.src = productImage.src;
                    flyingImage.style.position = 'fixed';
                    flyingImage.style.zIndex = '1001';
                    flyingImage.style.width = '50px';
                    flyingImage.style.height = '50px';
                    flyingImage.style.objectFit = 'contain';
                    flyingImage.style.borderRadius = '50%';
                    flyingImage.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                    flyingImage.style.transition = 'all 1s ease';
                    
                    // Get positions
                    const imgRect = productImage.getBoundingClientRect();
                    const cartRect = cartIcon.getBoundingClientRect();
                    
                    // Initial position
                    flyingImage.style.top = imgRect.top + 'px';
                    flyingImage.style.left = imgRect.left + 'px';
                    
                    document.body.appendChild(flyingImage);
                    
                    // Trigger animation to cart
                    setTimeout(() => {
                        flyingImage.style.top = cartRect.top + 'px';
                        flyingImage.style.left = cartRect.left + 'px';
                        flyingImage.style.width = '20px';
                        flyingImage.style.height = '20px';
                        flyingImage.style.opacity = '0';
                    }, 10);
                    
                    // Remove the element after animation
                    setTimeout(() => {
                        document.body.removeChild(flyingImage);
                        
                        // Cart notification animation
                        cartIcon.classList.add('pulse');
                        setTimeout(() => {
                            cartIcon.classList.remove('pulse');
                        }, 500);
                    }, 1000);
                    
                    // Update button text
                    this.textContent = 'In den Warenkorb gelegt';
                    
                    // Reset button text after delay
                    setTimeout(() => {
                        this.textContent = 'In den Warenkorb';
                    }, 2000);
                }
            }
        });
    });
    
    // Product Image Zoom Effect on Hover
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(image => {
        image.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) { // Only on desktop
                const imageRect = this.getBoundingClientRect();
                const x = (e.clientX - imageRect.left) / imageRect.width;
                const y = (e.clientY - imageRect.top) / imageRect.height;
                
                this.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            }
        });
    });
    
    // Lazy Loading for Product Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
});