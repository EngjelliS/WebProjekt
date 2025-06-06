import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import ScrollToTop from './components/ScrollToTop';
import StartTop from './components/StartTop';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import Help from './pages/Help';
import About from './pages/About';
import Login from './pages/Login';
import Cart from './pages/Cart';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalNotice from './pages/LegalNotice';

// Styles
import './styles/global.css';


function App() {
  // State to track scroll position for header transparency effect
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <StartTop></StartTop>
        <div className="app">
          <Header isScrolled={scrollPosition > 50} />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produkte" element={<Products />} />
              <Route path="/produkte/:id.html" element={<ProductDetails />} />
              <Route path="/bestelluebersicht" element={<Orders />} />
              <Route path="/hilfe" element={<Help />} />
              <Route path="/ueber-uns" element={<About />} />
              <Route path="/anmeldung" element={<Login />} />
              <Route path="/warenkorb" element={<Cart />} />
              <Route path="/nutzungsbedingungen" element={<TermsOfService />} />
              <Route path="/datenschutzrichtlinien" element={<PrivacyPolicy />} />
              <Route path="/impressum" element={<LegalNotice />} />
              {}
              <Route path="*" element={<div>404 - Seite nicht gefunden</div>} />
            </Routes>
          </main>

          <Footer />
          
          <ScrollToTop></ScrollToTop>
          
          <DarkModeToggle></DarkModeToggle>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;