import React, { useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import LocationCard from '../components/LocationCard';

const About = () => {
  const aboutPageRef = useRef(null);

  const aboutCards = [
    {
      title: "Unsere Philosophie",
      content: "Wir legen großen Wert auf faire und wettbewerbsfähige Preise, damit alle Musiker – unabhängig von ihrem Budget – Zugang zu hochwertigem Zubehör haben. Gleichzeitig bietet unsere Webseite eine benutzerfreundliche Oberfläche, die es unseren Kunden ermöglicht, ihre gewünschten Produkte schnell und einfach zu finden."
    },
    {
      title: "Unsere Produkte",
      content: "Unsere Produkte wurden sorgfältig von einem Expertenteam ausgewählt, das über umfassende Kenntnisse in der Musik- und Audiobranche verfügt. Neben renommierten Marken berücksichtigen wir auch innovative und weniger bekannte Hersteller, die durch herausragende Qualität überzeugen."
    },
    {
      title: "Unser Support",
      content: "Bei Melodika legen wir großen Wert auf schnellen und zuverlässigen Kundensupport. Unser Support-Team besteht aus Experten im Bereich Musikequipment, um unseren Kunden bei allen fachlichen Fragen ideal zu helfen."
    }
  ];

  const locations = [
    {
      title: "Hauptsitz",
      address: "Musterstadt\nMusterstraße 1\n12345 Musterstadt"
    },
    {
      title: "Niederlassung",
      address: "Beispielstadt\nBeispielstraße 2\n54321 Beispielstadt"
    },
    {
      title: "Logistikzentrum",
      address: "Logistikstadt\nVersandstraße 3\n98765 Logistikstadt"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = aboutPageRef.current.querySelectorAll('.fade-in, .slide-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-page" ref={aboutPageRef}>
      <HeroSection
        currentPage="about"
        title="Über Melodika"
        subtitle="Unsere Geschichte, Vision und was uns antreibt"
        backgroundImage="/Produkt2.jpeg"
        className="about-hero"
      />

      <section className="about-section">
        <div className="about-container">
          <div className="about-intro fade-in">
            <h2>Unsere Geschichte</h2>
            <p>
              Melodika hat es sich zum Ziel gesetzt, Musiker und Musikbegeisterte mit hochwertigem Zubehör wie Kopfhörern, Mikrofonen und anderen Audio-Produkten zu versorgen. 
              Unsere Plattform wurde speziell für Hobbyisten und professionelle Musiker entwickelt, um das passende Equipment einfach und effizient zu finden.
            </p>
          </div>

          <div className="about-grid">
            {aboutCards.map((card, index) => (
              <AboutCard
                key={index}
                title={card.title}
                content={card.content}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="vision-section">
        <div className="vision-content fade-in">
          <h2>Unsere Vision</h2>
          <p>
            Durch eine Kombination aus qualitativ hochwertigen Produkten, einer benutzerfreundlichen Webseite und einem hervorragenden Kundenservice wollen wir eine 
            zufriedene und treue Kundschaft aufbauen, die uns weiterempfiehlt und langfristig bei uns einkauft.
          </p>
        </div>
      </section>

      <section className="locations-section">
        <div className="locations-container">
          <h2 className="section-heading fade-in">Unsere Standorte</h2>
          
          <div className="locations-grid">
            {locations.map((location, index) => (
              <LocationCard
                key={index}
                title={location.title}
                address={location.address}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// AboutCard Component
const AboutCard = ({ title, content }) => {
  return (
    <div className="about-card slide-in">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default About;
