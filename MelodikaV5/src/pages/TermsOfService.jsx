import React from 'react';
import { useScrollAnimation } from '../hooks/useAnimation';

const TermsOfService = () => {
  useScrollAnimation();

  return (
    <main>
      {/* Hero Section with Parallax */}
      <section className="page-header-parallax">
        <div className="parallax-content">
          <h1 className="fade-in">Nutzungsbedingungen</h1>
          <p className="fade-in">Allgemeine Geschäftsbedingungen für die Nutzung von Melodika</p>
        </div>
      </section>

      {/* Content Section - Terms */}
      <section className="content-section" id="terms">
        <div className="content-container fade-in">
          <h2 className="section-heading">Allgemeine Bestimmungen</h2>
          
          <div className="impressum-card">
            <div className="card-content">
              <h3>1. Geltungsbereich</h3>
              <p>
                Diese Nutzungsbedingungen regeln die Nutzung der Website und der Dienste von Melodika GmbH. 
                Durch die Nutzung unserer Website oder Dienste erklären Sie sich mit diesen Bedingungen 
                einverstanden. Diese Bedingungen gelten für alle Nutzer, einschließlich Besucher, 
                registrierte Benutzer und zahlende Kunden.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>2. Registrierung und Konto</h3>
              <p>
                Für die vollständige Nutzung unserer Dienste ist eine Registrierung erforderlich. 
                Bei der Registrierung müssen Sie wahrheitsgemäße und vollständige Informationen 
                angeben. Sie sind verpflichtet, Ihre Kontodaten aktuell zu halten und für die 
                Sicherheit Ihrer Anmeldedaten zu sorgen. Sie dürfen Ihr Konto nicht an Dritte 
                weitergeben oder verkaufen.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>3. Erlaubte Nutzung</h3>
              <p>
                Sie verpflichten sich, unsere Dienste nur für rechtmäßige Zwecke zu nutzen. 
                Untersagt ist insbesondere: die Verbreitung illegaler, schädlicher oder 
                belästigender Inhalte; die Verletzung von Urheberrechten oder anderen 
                Schutzrechten; der Versuch, unbefugten Zugang zu unseren Systemen zu erlangen; 
                die Nutzung automatisierter Tools zum Sammeln von Daten ohne Erlaubnis.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>4. Verbotene Aktivitäten</h3>
              <p>
                Folgende Aktivitäten sind strengstens untersagt: Spam, Phishing oder andere 
                betrügerische Aktivitäten; das Hochladen von Viren, Malware oder anderen 
                schädlichen Codes; die Beeinträchtigung der Funktionalität unserer Dienste; 
                die Umgehung von Sicherheitsmaßnahmen; die kommerzielle Nutzung ohne 
                entsprechende Lizenz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content and Privacy Section */}
      <section className="legal-section">
        <div className="content-container fade-in">
          <h2 className="section-heading">Inhalte und Datenschutz</h2>
          
          <div className="legal-card">
            <h3>5. Urheberrecht und geistiges Eigentum</h3>
            <p>
              Alle Inhalte auf dieser Website, einschließlich Texte, Grafiken, Logos, Bilder, 
              Audio-Clips, digitale Downloads und Software, sind Eigentum von Melodika GmbH 
              oder unseren Lizenzgebern und durch deutsche und internationale Urheberrechtsgesetze 
              geschützt. Die Vervielfältigung, Bearbeitung, Verbreitung oder jede andere Art 
              der Verwertung bedarf unserer ausdrücklichen schriftlichen Zustimmung.
            </p>
          </div>
          
          <div className="legal-card">
            <h3>6. Nutzergenerierte Inhalte</h3>
            <p>
              Wenn Sie Inhalte auf unsere Plattform hochladen oder teilen, gewähren Sie uns 
              eine nicht-exklusive, weltweite, gebührenfreie Lizenz zur Nutzung, Reproduktion 
              und Verbreitung dieser Inhalte im Rahmen unserer Dienste. Sie bestätigen, dass 
              Sie über alle erforderlichen Rechte an diesen Inhalten verfügen und dass diese 
              keine Rechte Dritter verletzen.
            </p>
          </div>

          <div className="legal-card">
            <h3>7. Datenschutz</h3>
            <p>
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Unsere Datenschutzerklärung 
              regelt, wie wir Ihre Daten sammeln, verwenden und schützen. Durch die Nutzung 
              unserer Dienste stimmen Sie unserer Datenschutzerklärung zu. Wir geben Ihre 
              persönlichen Daten nicht ohne Ihre Zustimmung an Dritte weiter, außer in den 
              in unserer Datenschutzerklärung beschriebenen Fällen.
            </p>
          </div>
        </div>
      </section>

      {/* Terms and Liability Section */}
      <section className="content-section">
        <div className="content-container fade-in">
          <h2 className="section-heading">Haftung und Gewährleistung</h2>
          
          <div className="impressum-card">
            <div className="card-content">
              <h3>8. Haftungsbeschränkung</h3>
              <p>
                Wir haften nur für Schäden, die vorsätzlich oder grob fahrlässig von uns 
                verursacht wurden. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, 
                außer bei der Verletzung wesentlicher Vertragspflichten oder bei Schäden 
                aus der Verletzung des Lebens, des Körpers oder der Gesundheit. 
                Unsere Haftung ist auf den vorhersehbaren, typischen Schaden begrenzt.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>9. Gewährleistung</h3>
              <p>
                Wir bemühen uns, unsere Dienste fehlerfrei und kontinuierlich zur Verfügung 
                zu stellen. Dennoch können technische Probleme oder Wartungsarbeiten zu 
                Unterbrechungen führen. Eine 100%ige Verfügbarkeit können wir nicht garantieren. 
                Wir übernehmen keine Gewähr für die Richtigkeit, Vollständigkeit oder 
                Aktualität der bereitgestellten Informationen.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>10. Kündigung</h3>
              <p>
                Beide Parteien können die Nutzung der Dienste jederzeit ohne Angabe von 
                Gründen beenden. Wir behalten uns das Recht vor, Konten bei Verstößen 
                gegen diese Nutzungsbedingungen sofort zu sperren oder zu kündigen. 
                Nach Beendigung der Nutzung werden Ihre Daten gemäß unserer 
                Datenschutzerklärung behandelt.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>11. Änderungen der Nutzungsbedingungen</h3>
              <p>
                Wir können diese Nutzungsbedingungen jederzeit ändern oder ergänzen. 
                Wesentliche Änderungen werden wir Ihnen per E-Mail oder durch einen 
                Hinweis auf unserer Website mindestens 30 Tage im Voraus mitteilen. 
                Wenn Sie den Änderungen nicht zustimmen, können Sie Ihr Konto kündigen. 
                Die fortgesetzte Nutzung nach Inkrafttreten der Änderungen gilt als Zustimmung.
              </p>
            </div>
          </div>

          <div className="impressum-card">
            <div className="card-content">
              <h3>12. Anwendbares Recht und Gerichtsstand</h3>
              <p>
                Für diese Nutzungsbedingungen und alle sich daraus ergebenden Rechtsbeziehungen 
                gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand für 
                alle Streitigkeiten ist Musterstadt, sofern Sie Kaufmann, juristische Person 
                des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen sind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="legal-section">
        <div className="content-container fade-in">
          <h2 className="section-heading">Kontakt und Schlussbestimmungen</h2>
          
          <div className="legal-card">
            <h3>13. Kontakt</h3>
            <p>
              Für Fragen oder Anmerkungen zu diesen Nutzungsbedingungen wenden Sie sich bitte an:
            </p>
            <p>
              <strong>Melodika GmbH</strong><br/>
              Musterstraße 1<br/>
              12345 Musterstadt<br/>
              E-Mail: <a href="mailto:info@melodika.de" className="text-link">info@melodika.de</a><br/>
              Telefon: +49 123 456 7890
            </p>
          </div>
          
          <div className="legal-card">
            <h3>14. Salvatorische Klausel</h3>
            <p>
              Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam oder 
              undurchführbar sein oder werden, berührt dies nicht die Wirksamkeit der 
              übrigen Bestimmungen. Die unwirksame Bestimmung wird durch eine wirksame 
              Bestimmung ersetzt, die dem wirtschaftlichen Zweck der unwirksamen 
              Bestimmung am nächsten kommt.
            </p>
          </div>

          <div className="legal-card">
            <h3>Stand der Nutzungsbedingungen</h3>
            <p>
              Diese Nutzungsbedingungen sind gültig ab dem 01. Januar 2024.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsOfService;