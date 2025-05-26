import { useEffect, useRef, useState } from 'react';

const HeroSection = ({ currentPage = "home" }) => {
  const heroRef = useRef(null);
  
  // Bestimme das Hintergrundbild basierend auf der übergebenen Seite
  const getBackgroundImage = () => {
    switch(currentPage) {
      case 'home':
        return '/public/Produkt2.jpeg'; // Startseite
      case 'products':
        return '/public/Produkt3.jpeg'; // Produktseite
      case 'about':
        return '/public/Produkt6.jpeg'; // Über uns Seite
      case 'help':
        return '/public/Produkt5.jpeg'; // Kontaktseite
      case 'login':
        return '/public/Produkt1.jpeg';
      default:
        return '/public/Produkt3.jpeg'; // Standard-Bild
    }
  };

  // Bestimme die Höhe basierend auf der übergebenen Seite
  const getHeroHeight = () => {
    return currentPage === 'home' ? '100vh' : '50vh';
  };

  // Parallax-Effekt-Implementierung
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.pageYOffset;
        const parallaxFactor = 0.5; // Anpassen für mehr/weniger Effekt
        heroRef.current.style.backgroundPositionY = `${scrollPosition * parallaxFactor}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Magnetischer Button-Effekt
  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Position relativ zum Zentrum berechnen
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const offsetX = (x - centerX) / 15;
    const offsetY = (y - centerY) / 15;
    
    button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  // Dynamischer Seiteninhalt basierend auf der übergebenen Seite
  const getPageContent = () => {
    switch(currentPage) {
      case 'home':
        return {
          title: "Klanginnovation neu definiert",
          subtitle: "Entdecken Sie Musikzubehör in seiner vollendeten Form.",
          buttonText: "Entdecken",
          scroll: 900
        };
      case 'products':
        return {
          title: "Unsere Produkte",
          subtitle: "Qualität, die man hören kann.",
          buttonText: "Ansehen",
          scroll: 400
        };
      case 'about':
        return {
          title: "Über uns",
          subtitle: "Passion für perfekten Klang seit 2010.",
          buttonText: "Mehr erfahren",
          scroll: 400
        };
      case 'help':
        return {
          title: "Hilfe & Support",
          subtitle: "Wir sind hier für Sie. Entdecken Sie unsere Hilfeoptionen.",
          buttonText: "Jetzt kontaktieren",
          scroll: 1170
        };
      case 'login':
        return {
          title: "Willkommen zurück",
          subtitle: "Melden Sie sich an, um Ihre Melodika-Erfahrung fortzusetzen.",
          buttonText: "Jetzt anmelden",
          scroll: 300
        };
      default:
        return {
          title: "Willkommen",
          subtitle: "Entdecken Sie unsere Welt.",
          buttonText: "Weiter",
          scroll: 300
        };
    }
  };
  
  const pageContent = getPageContent();
  const backgroundImage = getBackgroundImage();
  const heroHeight = getHeroHeight();

  return (
    <section 
      className="hero-parallax" 
      ref={heroRef}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: heroHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="parallax-content text-center p-8 bg-black bg-opacity-30 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{pageContent.title}</h1>
        <p className="text-xl md:text-2xl text-white mb-8">{pageContent.subtitle}</p>
        <button 
          className="cta-button"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            window.scrollTo({
              top: window.scrollY + pageContent.scroll,
              behavior: 'smooth'
            });
          }}
        >
          {pageContent.buttonText}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;