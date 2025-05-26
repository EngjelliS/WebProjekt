import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ProductHero = ({ product, onAddToCart, isAddingToCart }) => {
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animation für Elemente beim Laden
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Beobachte das Bild und den Content-Bereich
    const imageElement = imageRef.current;
    const contentElement = contentRef.current;

    if (imageElement) {
      observer.observe(imageElement);
    }

    if (contentElement) {
      const contentElements = contentElement.querySelectorAll('.fade-in');
      contentElements.forEach(el => observer.observe(el));
    }

    // Cleanup function
    return () => {
      if (imageElement) {
        observer.unobserve(imageElement);
      }
      if (contentElement) {
        const contentElements = contentElement.querySelectorAll('.fade-in');
        contentElements.forEach(el => observer.unobserve(el));
      }
      observer.disconnect();
    };
  }, [product.id]); // Nur bei Änderung der product.id neu ausführen

  return (
    <section className="product-hero">
      <div className="product-hero-content" ref={contentRef}>
        <h1 className="fade-in">{product.name}</h1>
        <p className="fade-in">{product.description}</p>
        <p className="price fade-in">{product.priceText}</p>
        <div className="product-actions fade-in">
          <button 
            className={`cta-button ${isAddingToCart ? 'added' : ''}`}
            onClick={onAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? '✓ Hinzugefügt' : 'In den Warenkorb'}
          </button>
          <p className="delivery-info">{product.deliveryInfo}</p>
        </div>
      </div>
      <div className="product-hero-image">
        <img 
          ref={imageRef}
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            console.log('Image load error:', product.image);
            e.target.src = '/api/placeholder/400/300'; // Fallback image
          }}
        />
      </div>
    </section>
  );
};

ProductHero.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    deliveryInfo: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isAddingToCart: PropTypes.bool
};

ProductHero.defaultProps = {
  isAddingToCart: false
};

export default ProductHero;