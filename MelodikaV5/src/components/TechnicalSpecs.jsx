import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const TechnicalSpecs = ({ specs }) => {
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

    // Beobachte die Überschrift
    const heading = sectionRef.current.querySelector('.section-heading');
    if (heading) observer.observe(heading);

    // Beobachte die Spezifikationsspalten
    const columns = sectionRef.current.querySelectorAll('.specs-column');
    columns.forEach(column => observer.observe(column));

    return () => {
      if (heading) observer.unobserve(heading);
      columns.forEach(column => observer.unobserve(column));
    };
  }, [specs]);

  // Teile die Specs in zwei Spalten auf
  const halfLength = Math.ceil(specs.length / 2);
  const firstColumnSpecs = specs.slice(0, halfLength);
  const secondColumnSpecs = specs.slice(halfLength);

  return (
    <section className="tech-specs" ref={sectionRef}>
      <div className="specs-container">
        <h2 className="section-heading fade-in">Technische Daten</h2>
        <div className="specs-grid">
          <div className="specs-column fade-in">
            {firstColumnSpecs.map((spec, index) => (
              <div key={index} className="specs-item">
                <h3>{spec.name}</h3>
                <p>{spec.value}</p>
              </div>
            ))}
          </div>
          <div className="specs-column fade-in">
            {secondColumnSpecs.map((spec, index) => (
              <div key={index} className="specs-item">
                <h3>{spec.name}</h3>
                <p>{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

TechnicalSpecs.propTypes = {
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TechnicalSpecs;