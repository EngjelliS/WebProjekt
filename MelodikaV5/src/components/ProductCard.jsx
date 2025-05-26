import { useRef, useEffect } from 'react';

const ProductCard = ({ product }) => {
  // Destructure all properties that might come from different data sources
  const { id, name, title, price, description, image } = product;
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  
  // Use product name or title, depending on which one is available
  const displayName = name || title;
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div className="gallery-item fade-in" ref={cardRef}>
      <div className="item-content">
        <img
          src={image}
          alt={displayName}
          ref={imageRef}
        />
        <h3>{displayName}</h3>
        <p>{description || `Entdecken Sie ${displayName}`}</p>
        <p className="price">{price}</p>
        <div className="cta-button" onClick={() => window.location.href = `/produkte/${product.id}`}>
          Details anzeigen 
        </div>
      </div>
    </div>
  );
};

export default ProductCard;