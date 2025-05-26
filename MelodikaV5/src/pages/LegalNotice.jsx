import React from 'react';
import { useScrollAnimation } from '../hooks/useAnimation';

const LegalNotice = () => {
  useScrollAnimation();

  return (
    <main>
      {/* Hero Section with Parallax */}
      <section className="page-header-parallax">
        <div className="parallax-content">
          <h1 className="fade-in">Impressum</h1>
          <p className="fade-in">Informationen und rechtliche Hinweise zu Melodika</p>
        </div>
      </section>

      {/* Content Section - Impressum */}
      <section className="content-section" id="impressum">
        <div className="content-container fade-in">
          <h2 className="section-heading">Angaben gemäß § 5 TMG</h2>
          
          <div className="impressum-card">
            <div className="card-content">
              <h3>Melodika GmbH</h3>
              <p>
                Musterstraße 1<br/>
                12345 Musterstadt
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>Vertreten durch</h3>
              <p>Max Mustermann (Geschäftsführer)</p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>Kontakt</h3>
              <p>
                Telefon: +49 123 456 7890<br/>
                E-Mail: <a href="mailto:info@melodika.de" className="text-link">info@melodika.de</a><br/>
                Website: <a href="https://www.melodika.de" target="_blank" rel="noopener noreferrer" className="text-link">www.melodika.de</a>
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>Handelsregister</h3>
              <p>Eintragung im Handelsregister des Amtsgerichts Musterstadt, HRB 12345</p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>Umsatzsteuer-Identifikationsnummer</h3>
              <p>gemäß § 27 a Umsatzsteuergesetz: DE123456789</p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
              <p>
                Max Mustermann<br/>
                Musterstraße 1<br/>
                12345 Musterstadt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="legal-section">
        <div className="content-container fade-in">
          <h2 className="section-heading">Rechtliche Hinweise</h2>
          
          <div className="legal-card">
            <h3>Haftungsausschluss (Disclaimer)</h3>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </div>
          
          <div className="legal-card">
            <h3>Urheberrecht</h3>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LegalNotice;