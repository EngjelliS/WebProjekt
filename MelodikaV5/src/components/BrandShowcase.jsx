import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/components.css';

const BrandShowcase = () => {
  const [visibleElements, setVisibleElements] = useState([]);
  const { theme } = useContext(ThemeContext);

  // Data for brand cards
  const brandCards = [
    {
      id: 1,
      title: "Klangperfektion",
      description: "Exzellente Akustik für jeden Moment",
      imageSrc: "/Bild1.png",
      imageAlt: "Bild 1"
    },
    {
      id: 2,
      title: "Stilvolle Innovation",
      description: "Technologie, die begeistert",
      imageSrc: "/Bild2.png",
      imageAlt: "Bild 2"
    },
    {
      id: 3,
      title: "Kreative Freiheit",
      description: "Werkzeuge für Ihre musikalische Vision",
      imageSrc: "/Bild3.png",
      imageAlt: "Bild 3"
    }
  ];

  // Animation logic for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.brand-card');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Check if element should be visible
  const isVisible = (id) => visibleElements.includes(`brand-card-${id}`);

  return (
    <section className="brand-showcase" data-theme={theme}>
      <div className="showcase-container">
        {brandCards.map((card) => (
          <div 
            key={card.id}
            id={`brand-card-${card.id}`}
            className={`brand-card ${isVisible(card.id) ? 'visible' : ''} fade-in`}
          >
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <div className="card-image">
              <img src={card.imageSrc} alt={card.imageAlt} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandShowcase;