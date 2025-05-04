document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme on load
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme when button is clicked
    darkModeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
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
    
    // Scroll to Top Button Functionality
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    
    // Show or hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.fade-in, .scale-in');
    
    // Initial check for elements in viewport on page load
    checkVisibility();
    
    // Check elements visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    
    function checkVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    // Image zoom effect for product gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.cta-button');
    
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('In den Warenkorb')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product details from the page
                const productName = document.querySelector('.product-hero h1').textContent;
                const productPrice = document.querySelector('.product-hero .price').textContent;
                
                // Add to cart animation
                button.textContent = '✓ Hinzugefügt';
                button.style.backgroundColor = '#4CAF50';
                
                // Store in local storage
                addToCart(productName, productPrice);
                
                // Reset button after animation
                setTimeout(() => {
                    button.textContent = 'In den Warenkorb';
                    button.style.backgroundColor = '';
                }, 2000);
            });
        }
    });
    
    // Function to add product to cart in local storage
    function addToCart(name, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex(item => item.name === name);
        
        if (existingProductIndex > -1) {
            // Increment quantity if product already exists
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add new product if it doesn't exist
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        // Update cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart icon (optional)
        updateCartIcon();
    }
    
    // Function to update cart icon with item count
    function updateCartIcon() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;
        
        cart.forEach(item => {
            totalItems += item.quantity;
        });
    }
    
    // Initialize cart icon on page load
    updateCartIcon();
    
    // Product image zoom functionality
    const productImage = document.querySelector('.product-image');
    if (productImage) {
        const container = document.querySelector('.product-hero-image');
        
        container.addEventListener('mouseenter', function() {
            productImage.style.transition = 'transform 0.5s ease';
            productImage.style.transform = 'scale(1.05)';
        });
        
        container.addEventListener('mouseleave', function() {
            productImage.style.transition = 'transform 0.5s ease';
            productImage.style.transform = 'scale(1)';
        });
    }
    
    // Optional: Create image gallery functionality if needed
    // This is for products with multiple images
    // Uncomment and adapt this code if you have multiple product images
    
    /*
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const mainImage = document.querySelector('.product-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const newSrc = this.getAttribute('data-src');
                mainImage.src = newSrc;
                
                // Update active state
                thumbnails.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    */
});