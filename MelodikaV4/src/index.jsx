import { useState, useEffect } from 'react';
import './index.css';
import melodikaLogo from './assets/Firmenlogo.png';
import produktOneImage from './assets/Produkt1.jpeg';
import produktTwoImage from './assets/Produkt2.jpeg';
import produktThreeImage from './assets/Produkt3.jpeg';
import markeAImage from './assets/MarkeA.jpg';
import markeBImage from './assets/MarkeB.jpg';
import markeCImage from './assets/MarkeC.jpg';

function App() {
  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState(false);
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Effect for scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial check for elements in view
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>🌓</button>

      <header className="nav-container">
        <nav className="global-nav">
          <div className="nav-wrapper">
            <div className="logo-wrapper">
              <a href="/" className="logo-link">
                <img src={melodikaLogo} alt="Melodika" className="melodika-logo" />
              </a>
            </div>
            <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <li><a href="/">Startseite</a></li>
              <li><a href="/produkte">Produkte</a></li>
              <li><a href="/bestelluebersicht">Bestellübersicht</a></li>
              <li><a href="/hilfe">Hilfe</a></li>
              <li><a href="/ueber-uns">Über uns</a></li>
            </ul>
            <div className="nav-actions">
              <a href="/warenkorb" className="nav-icon-link">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </a>
              <a href="/anmeldung" className="nav-icon-link">
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </a>
            </div>
            <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Menu">
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section with Parallax */}
        <section className="hero-parallax">
          <div className="parallax-content">
            <h1 className="fade-in">Klanginnovation neu definiert</h1>
            <p className="fade-in">Entdecken Sie Musikzubehör in seiner vollendeten Form.</p>
            <a href="#explore" className="cta-button fade-in">Entdecken</a>
          </div>
        </section>

        {/* Featured Product with Sticky Scroll Effect */}
        <section className="featured-product" id="explore">
          <div className="product-sticky-container">
            <div className="sticky-text">
              <h2 className="slide-in">Studiokopfhörer<br />AudioPro HD</h2>
              <p className="slide-in">Klangqualität auf Studio-Niveau.<br />Unvergleichliche Präzision.</p>
              <a href="/produktdetails1" className="learn-more slide-in">Mehr erfahren &gt;</a>
            </div>
            <div className="sticky-image">
              <img src={produktOneImage} alt="Studiokopfhörer AudioPro HD" className="product-image scale-in" />
            </div>
          </div>
        </section>

        {/* Product Gallery */}
        <section className="product-gallery">
          <h2 className="section-heading">Unsere Bestseller</h2>
          <div className="gallery-grid">
            <div className="gallery-item fade-in">
              <div className="item-content">
                <img src={produktOneImage} alt="Studiokopfhörer AudioPro HD" />
                <h3>AudioPro HD</h3>
                <p>Klangqualität auf Studio-Niveau für präzises Hören</p>
                <a href="/produktdetails1" className="learn-more">Mehr erfahren &gt;</a>
              </div>
            </div>
            <div className="gallery-item fade-in">
              <div className="item-content">
                <img src={produktTwoImage} alt="Mikrofonstativ FlexiMic Stand" />
                <h3>FlexiMic Stand</h3>
                <p>Robustes, höhenverstellbares Stativ</p>
                <a href="/produktdetails2" className="learn-more">Mehr erfahren &gt;</a>
              </div>
            </div>
            <div className="gallery-item fade-in">
              <div className="item-content">
                <img src={produktThreeImage} alt="Gitarren-Tuner TuneMate Pro" />
                <h3>TuneMate Pro</h3>
                <p>Kompakter Clip-On-Tuner für Saiteninstrumente</p>
                <a href="/produktdetails3" className="learn-more">Mehr erfahren &gt;</a>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Promise Section */}
        <section className="brand-promise">
          <div className="promise-content fade-in">
            <h2>Qualität in jedem Detail</h2>
            <p>Bei Melodika verschmelzen Innovation und Handwerkskunst zu Musikzubehör, das Ihre Kreativität auf ein neues Niveau hebt.</p>
          </div>
        </section>

        {/* Brand Showcase with Cards */}
        <section className="brand-showcase">
          <div className="showcase-container">
            <div className="brand-card fade-in">
              <div className="card-content">
                <h3>Klangperfektion</h3>
                <p>Exzellente Akustik für jeden Moment</p>
              </div>
              <div className="card-image">
                <img src={markeAImage} alt="Marke A" />
              </div>
            </div>
            <div className="brand-card fade-in">
              <div className="card-content">
                <h3>Stilvolle Innovation</h3>
                <p>Technologie, die begeistert</p>
              </div>
              <div className="card-image">
                <img src={markeBImage} alt="Marke B" />
              </div>
            </div>
            <div className="brand-card fade-in">
              <div className="card-content">
                <h3>Kreative Freiheit</h3>
                <p>Werkzeuge für Ihre musikalische Vision</p>
              </div>
              <div className="card-image">
                <img src={markeCImage} alt="Marke C" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-nav">
          <div className="footer-column">
            <h3>Entdecken</h3>
            <ul>
              <li><a href="/">Startseite</a></li>
              <li><a href="/produkte">Produkte</a></li>
              <li><a href="/bestelluebersicht">Bestellübersicht</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Über Melodika</h3>
            <ul>
              <li><a href="/ueber-uns">Über uns</a></li>
              <li><a href="/hilfe">Hilfe</a></li>
              <li><a href="/impressum">Impressum</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <div className="footer-logo">
              <img src={melodikaLogo} alt="Melodika Logo" className="logo-footer" />
            </div>
          </div>
        </div>
        <div className="footer-legal">
          <p>&copy; {new Date().getFullYear()} Melodika. Alle Rechte vorbehalten.</p>
          <p className="disclaimer">Achtung! Dies ist ein studentisches Projekt! Wir übernehmen keine Haftung!</p>
        </div>
      </footer>

      <a href="#" className="scroll-to-top" onClick={(e) => {e.preventDefault(); scrollToTop();}} aria-label="Nach oben scrollen">
        <svg viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
      </a>
    </div>
  );
}

export default App;