import React from 'react';
import { useScrollAnimation } from '../hooks/useAnimation';

const PrivacyPolicy = () => {
  useScrollAnimation();

  return (
    <main>
      {/* Hero Section with Parallax */}
      <section className="page-header-parallax">
        <div className="parallax-content">
          <h1 className="fade-in">Datenschutzrichtlinien</h1>
          <p className="fade-in">Transparenz und Schutz Ihrer persönlichen Daten bei Melodika</p>
        </div>
      </section>

      {/* Content Section - Datenschutz */}
      <section className="content-section" id="datenschutz">
        <div className="content-container fade-in">
          <h2 className="section-heading">Datenschutzerklärung</h2>
          
          <div className="impressum-card">
            <div className="card-content">
              <h3>1. Einführung und Verantwortlicher</h3>
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig. Diese Datenschutzerklärung 
                informiert Sie über die Art, den Umfang und den Zweck der Verarbeitung personenbezogener 
                Daten auf unserer Website und in unseren Diensten.
              </p>
              <p>
                <strong>Verantwortlicher im Sinne der DSGVO:</strong><br/>
                Melodika GmbH<br/>
                Musterstraße 1<br/>
                12345 Musterstadt<br/>
                E-Mail: <a href="mailto:datenschutz@melodika.de" className="text-link">datenschutz@melodika.de</a>
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>2. Rechtsgrundlagen der Verarbeitung</h3>
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage der folgenden Rechtsgrundlagen 
                der EU-Datenschutz-Grundverordnung (DSGVO):
              </p>
              <p>
                • <strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Einwilligung der betroffenen Person<br/>
                • <strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Vertragserfüllung und vorvertragliche Maßnahmen<br/>
                • <strong>Art. 6 Abs. 1 lit. c DSGVO:</strong> Erfüllung rechtlicher Verpflichtungen<br/>
                • <strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Berechtigte Interessen
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>3. Datenerfassung und -verwendung</h3>
              <p>
                <strong>Personenbezogene Daten beim Besuch unserer Website:</strong><br/>
                Beim Aufruf unserer Website werden automatisch Informationen an den Server unserer Website 
                übermittelt. Diese Informationen werden temporär in einem sog. Logfile gespeichert:
              </p>
              <p>
                • IP-Adresse des anfragenden Rechners<br/>
                • Datum und Uhrzeit des Zugriffs<br/>
                • Name und URL der abgerufenen Datei<br/>
                • Website, von der aus der Zugriff erfolgt (Referrer-URL)<br/>
                • Verwendeter Browser und ggf. das Betriebssystem
              </p>
              <p>
                Diese Daten werden zur Gewährleistung eines störungsfreien Verbindungsaufbaus, zur 
                Systemsicherheit und zur Optimierung unserer Website verwendet.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>4. Registrierung und Nutzerkonto</h3>
              <p>
                Bei der Registrierung für unsere Dienste erfassen wir folgende Daten:
              </p>
              <p>
                • Vor- und Nachname<br/>
                • E-Mail-Adresse<br/>
                • Passwort (verschlüsselt gespeichert)<br/>
                • Geburtsdatum (zur Altersverifikation)<br/>
                • Ggf. weitere freiwillige Profilinformationen
              </p>
              <p>
                Diese Daten werden zur Bereitstellung unserer Dienste, zur Kontaktaufnahme und zur 
                Erfüllung vertraglicher Verpflichtungen verwendet. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>5. Cookies und ähnliche Technologien</h3>
              <p>
                Unsere Website verwendet Cookies, um die Funktionalität zu verbessern und die Nutzererfahrung 
                zu optimieren. Wir unterscheiden zwischen:
              </p>
              <p>
                <strong>Technisch notwendige Cookies:</strong> Diese sind für die Grundfunktionen der Website erforderlich 
                und können nicht deaktiviert werden.
              </p>
              <p>
                <strong>Funktionale Cookies:</strong> Diese ermöglichen erweiterte Funktionen und Personalisierung.
              </p>
              <p>
                <strong>Analyse-Cookies:</strong> Diese helfen uns, die Website-Nutzung zu verstehen und zu verbessern.
              </p>
              <p>
                Sie können Ihre Cookie-Einstellungen jederzeit in den Browser-Einstellungen anpassen oder 
                über unser Cookie-Banner verwalten.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>6. Weitergabe von Daten</h3>
              <p>
                Wir geben Ihre persönlichen Daten nicht ohne Ihre ausdrückliche Einwilligung an Dritte weiter, 
                außer in folgenden Fällen:
              </p>
              <p>
                • Zur Erfüllung gesetzlicher Verpflichtungen<br/>
                • An Auftragsverarbeiter, die uns bei der Erbringung unserer Dienste unterstützen<br/>
                • Bei berechtigten Interessen zur Durchsetzung von Rechtsansprüchen<br/>
                • Mit Ihrer ausdrücklichen Einwilligung
              </p>
              <p>
                Alle Auftragsverarbeiter sind vertraglich verpflichtet, Ihre Daten vertraulich zu behandeln 
                und nur gemäß unseren Weisungen zu verarbeiten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Legal Section */}
      <section className="legal-section">
        <div className="content-container fade-in">
          <h2 className="section-heading">Ihre Rechte und weitere Informationen</h2>
          
          <div className="legal-card">
            <h3>7. Ihre Datenschutzrechte</h3>
            <p>
              Gemäß der DSGVO haben Sie folgende Rechte bezüglich Ihrer personenbezogenen Daten:
            </p>
            <p>
              <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht zu erfahren, welche Daten wir über Sie gespeichert haben.<br/>
              <strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können die Korrektur unrichtiger Daten verlangen.<br/>
              <strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können unter bestimmten Umständen die Löschung Ihrer Daten verlangen.<br/>
              <strong>Einschränkungsrecht (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung verlangen.<br/>
              <strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten in einem strukturierten Format erhalten.<br/>
              <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.
            </p>
          </div>
          
          <div className="legal-card">
            <h3>8. Datensicherheit</h3>
            <p>
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten vor 
              Verlust, Manipulation und unbefugtem Zugriff zu schützen. Dazu gehören:
            </p>
            <p>
              • SSL/TLS-Verschlüsselung für die Datenübertragung<br/>
              • Sichere Server in zertifizierten Rechenzentren<br/>
              • Regelmäßige Sicherheitsupdates und -überprüfungen<br/>
              • Zugriffsbeschränkungen und Authentifizierungsverfahren<br/>
              • Regelmäßige Schulungen unserer Mitarbeiter
            </p>
          </div>

          <div className="legal-card">
            <h3>9. Speicherdauer</h3>
            <p>
              Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die jeweiligen Zwecke 
              erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen. Konkret bedeutet das:
            </p>
            <p>
              • Kontaktdaten: Bis zur Löschung des Nutzerkontos<br/>
              • Vertragsdaten: Gemäß handels- und steuerrechtlichen Aufbewahrungsfristen (bis zu 10 Jahre)<br/>
              • Logfiles: Maximal 7 Tage<br/>
              • Marketing-Einwilligungen: Bis zum Widerruf
            </p>
          </div>

          <div className="legal-card">
            <h3>10. Internationale Datenübertragung</h3>
            <p>
              Soweit wir Daten in Länder außerhalb des Europäischen Wirtschaftsraums übertragen, 
              stellen wir durch geeignete Garantien sicher, dass ein angemessenes Datenschutzniveau 
              gewährleistet ist. Dies geschieht durch:
            </p>
            <p>
              • EU-Standardvertragsklauseln<br/>
              • Angemessenheitsbeschlüsse der Europäischen Kommission<br/>
              • Zertifizierungen wie Privacy Shield (sofern anwendbar)
            </p>
          </div>

          <div className="legal-card">
            <h3>11. Änderungen der Datenschutzerklärung</h3>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte 
              Rechtslagen oder bei Änderungen des Dienstes sowie der Datenverarbeitung anzupassen. 
              Bei wesentlichen Änderungen werden wir Sie per E-Mail oder durch einen deutlichen 
              Hinweis auf unserer Website informieren.
            </p>
            <p>
              <strong>Stand dieser Datenschutzerklärung:</strong> Januar 2025
            </p>
          </div>

          <div className="legal-card">
            <h3>12. Kontakt und Beschwerderecht</h3>
            <p>
              <strong>Datenschutzbeauftragter:</strong><br/>
              E-Mail: <a href="mailto:datenschutz@melodika.de" className="text-link">datenschutz@melodika.de</a><br/>
              Telefon: +49 123 456 7891
            </p>
            <p>
              <strong>Beschwerderecht:</strong><br/>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung 
              Ihrer personenbezogenen Daten durch uns zu beschweren. Die für uns zuständige 
              Aufsichtsbehörde ist die Landesbeauftragte für Datenschutz und Informationsfreiheit 
              des jeweiligen Bundeslandes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;