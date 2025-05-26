import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-nav">
        <div className="footer-column">
          <h3>Entdecken</h3>
          <ul>
            <li><Link to="/">Startseite</Link></li>
            <li><Link to="/produkte">Produkte</Link></li>
            <li><Link to="/bestelluebersicht">Bestellübersicht</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Über Melodika</h3>
          <ul>
            <li><Link to="/ueber-uns">Über uns</Link></li>
            <li><Link to="/hilfe">Hilfe</Link></li>
            <li><Link to="/impressum">Impressum</Link></li>
            <li><Link to="/datenschutzrichtlinien">Datenschutz</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <div className="footer-logo">
            <img src="/Firmenlogo.png" alt="Melodika Logo" className="logo-footer" />
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <p>&copy; {new Date().getFullYear()} Melodika. Alle Rechte vorbehalten.</p>
        <p className="disclaimer">Achtung! Dies ist ein studentisches Projekt! Wir übernehmen keine Haftung!</p>
      </div>
    </footer>
  );
};

export default Footer;