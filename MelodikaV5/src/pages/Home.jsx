import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import BrandPromise from '../components/BrandPromise';
import BrandShowcase from '../components/BrandShowcase';

const Home = () => {
  const featuredProductRef = useRef(null);

  // Animation für Featured Product
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.slide-in, .scale-in').forEach(el => {
            el.classList.add('visible');
          });
        }
      });
    }, { threshold: 0.1 });

    if (featuredProductRef.current) {
      observer.observe(featuredProductRef.current);
    }

    return () => {
      if (featuredProductRef.current) {
        observer.unobserve(featuredProductRef.current);
      }
    };
  }, []);

  // Produktdaten
  const featuredProducts = [
    {
      id: 1,
      title: 'AudioPro HD',
      description: 'Klangqualität auf Studio-Niveau für präzises Hören',
      image: '/Produkt1.jpeg',
      detailUrl: '/produkte/1'
    },
    {
      id: 2,
      title: 'FlexiMic Stand',
      description: 'Robustes, höhenverstellbares Stativ',
      image: '/Produkt2.jpeg',
      detailUrl: '/produkte/2'
    },
    {
      id: 3,
      title: 'TuneMate Pro',
      description: 'Kompakter Clip-On-Tuner für Saiteninstrumente',
      image: '/Produkt3.jpeg',
      detailUrl: '/produkte/3'
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSection currentPage="home" />

      {/* Featured Product Section */}
      <section className="featured-product" id="explore" ref={featuredProductRef}>
        <div className="product-sticky-container">
          <div className="sticky-text">
            <h2 className="slide-in">Studiokopfhörer<br />AudioPro HD</h2>
            <p className="slide-in">Klangqualität auf Studio-Niveau.<br />Unvergleichliche Präzision.</p>
            <Link to="/produkte/1" className="learn-more slide-in">Mehr erfahren &gt;</Link>
          </div>
          <div className="sticky-image">
            <img src="/Produkt1.jpeg" alt="Studiokopfhörer AudioPro HD" className="product-image scale-in" />
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="product-gallery">
        <h2 className="section-heading">Unsere Bestseller</h2>
        <div className="gallery-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Promise */}
      <BrandPromise />

      {/* Brand Showcase */}
      <BrandShowcase></BrandShowcase>
    </main>
  );
};

export default Home;