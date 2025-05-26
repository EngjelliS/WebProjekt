import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// SVG-Icon-Komponente, die je nach Icon-Name das entsprechende SVG rendert
const FeatureIcon = ({ name }) => {
  const renderIcon = () => {
    switch (name) {
      case 'headphones':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z" />
          </svg>
        );
      case 'design':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z" />
          </svg>
        );
      case 'equalizer':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2V10H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z" />
          </svg>
        );
      case 'battery':
        return (
          <svg viewBox="0 0 24 24">
            <path d="M19.8 10.7L4.2 5l-.7 1.9L17.6 12H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5.5c0-.8-.5-1.6-1.2-1.8zM7 17H5v-2h2v2zm12 0H9v-2h10v2z" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        );
    }
  };

  return <div className="feature-icon">{renderIcon()}</div>;
};

const ProductFeatures = ({ features }) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Animation für Elemente beim Scrollen
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

    const featureItems = sectionRef.current.querySelectorAll('.feature-item');
    featureItems.forEach(item => observer.observe(item));

    // Beobachte auch die Überschrift
    const heading = sectionRef.current.querySelector('.section-heading');
    if (heading) observer.observe(heading);

    return () => {
      featureItems.forEach(item => observer.unobserve(item));
      if (heading) observer.unobserve(heading);
    };
  }, [features]);

  return (
    <section className="product-features" ref={sectionRef}>
      <div className="features-container">
        <h2 className="section-heading fade-in">Produktdetails</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item fade-in">
              <FeatureIcon name={feature.icon} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

FeatureIcon.propTypes = {
  name: PropTypes.string.isRequired
};

ProductFeatures.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ProductFeatures;