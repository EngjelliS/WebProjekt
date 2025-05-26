import React from 'react';
import { Link } from 'react-router-dom';


const RelatedProducts = ({ products }) => {
  // If no related products, don't render the component
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="related-products-section">
      <div className="container">
        <h2 className="section-title">Verwandte Produkte</h2>
        <p className="section-subtitle">Diese Produkte könnten Sie auch interessieren</p>
        
        <div className="related-products-grid">
          {products.map((product) => (
            <div key={product.id} className="related-product-card">
              <Link to={`/produkte/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image" 
                    onError={(e) => {
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.priceText}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;