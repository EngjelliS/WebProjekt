import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import BrandPromise from '../components/BrandPromise';
import { useScrollAnimation } from '../hooks/useAnimation';

const Products = () => {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Initialize scroll animation hook
  useScrollAnimation();

  // Extract search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  // Fetch products (in a real application, this would be an API call)
  useEffect(() => {
    // Simulate a fetch request
    setTimeout(() => {
      const productData = [
        {
          id: 1,
          title: 'Studiokopfhörer AudioPro HD',
          description: 'Klangqualität auf Studio-Niveau für präzises Hören',
          price: "149,99 €",
          image: 'Produkt1.jpeg',
          category: 'audio'
        },
        {
          id: 2,
          title: 'Mikrofonstativ FlexiMic Stand',
          description: 'Professionelles USB-Mikrofon für Streaming und Aufnahmen',
          price: "34,99 €",
          image: 'Produkt2.jpeg',
          category: 'recording'
        },
        {
          id: 3,
          title: 'Gitarren-Tuner TuneMate Pro',
          description: 'Kompakter Clip-On-Tuner für Saiteninstrumente',
          price: "19,99 €",
          image: 'Produkt3.jpeg',
          category: 'guitar'
        },
        {
          id: 4,
          title: 'Digitales Metronom TempoMaster Pro',
          description: 'Digitales Metronom mit präziser Taktgebung',
          price: "39,99 €",
          image: 'Produkt4.jpeg',
          category: 'accessories'
        },
        {
          id: 5,
          title: 'Keyboard-Pedal ProSustain FX',
          description: 'Präzises Sustain-Pedal für Keyboards',
          price: "24,99 €",
          image: 'Produkt5.jpeg',
          category: 'keyboard'
        },
        {
          id: 6,
          title: 'Gitarren-Effektpedal RockRiot Distortion X',
          description: 'Vielseitiges Effektpedal für Gitarren',
          price: "59,99 €",
          image: 'Produkt6.jpeg',
          category: 'guitar'
        }
      ];
      
      setProducts(productData);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    // Update URL to remove search parameter
    window.history.replaceState({}, document.title, "/produkte");
  };

  return (
    <div className="products-page">
      <HeroSection 
        currentPage='products'
        title="Unsere Produkte"
        subtitle="Entdecken Sie unsere Auswahl an hochwertigen Musikzubehör."
        backgroundImage="Produkt3.jpeg"
        className="product-hero"
      />
      
      <section className="products-section">
        <div className="section-heading-container">
          <h2 className="section-heading fade-in">
            {searchTerm ? `Suchergebnisse für "${searchTerm}"` : 'Alle Produkte'}
          </h2>
          {searchTerm && (
            <div className="search-info">
              <p className="search-results-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Produkt gefunden' : 'Produkte gefunden'}
              </p>
              <button onClick={clearSearch} className="clear-search-btn">
                Suche zurücksetzen
              </button>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="loading-spinner">Laden...</div>
        ) : (
          <>
            {filteredProducts.length === 0 && searchTerm ? (
              <div className="no-results">
                <h3>Keine Produkte gefunden</h3>
                <p>Leider konnten wir keine Produkte für "{searchTerm}" finden.</p>
                <button onClick={clearSearch} className="show-all-btn">
                  Alle Produkte anzeigen
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-item-container" onClick={() => window.location.href = `/produkte/${product.id}`}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
      
      <BrandPromise 
        title="Musikzubehör neu definiert"
        description="Unsere Produkte vereinen Innovation, Qualität und Design, um Ihre musikalische Reise zu bereichern."
      />
    </div>
  );
};

export default Products;