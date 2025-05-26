import React, { useState, useEffect, useRef } from 'react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const faqContainerRef = useRef(null);

  const faqData = [
    {
      id: 1,
      question: "Wie kann ich ein Produkt bestellen?",
      answer: "Um ein Produkt zu bestellen, wählen Sie das gewünschte Produkt aus unserer Produktseite aus und klicken Sie auf \"In den Warenkorb\". Anschließend können Sie über den Warenkorb den Bestellprozess abschließen und zur Kasse gehen."
    },
    {
      id: 2,
      question: "Welche Zahlungsmethoden akzeptieren Sie?",
      answer: (
        <div>
          <p>Wir akzeptieren eine Vielzahl von Zahlungsmethoden, darunter:</p>
          <ul>
            <li>Kreditkarten (Visa, Mastercard, American Express)</li>
            <li>PayPal</li>
            <li>Sofortüberweisung</li>
            <li>Rechnung (für Bestandskunden)</li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      question: "Wie lange dauert die Lieferung?",
      answer: "Die Standard-Lieferzeit beträgt 3-5 Werktage innerhalb Deutschlands. Bei internationalen Sendungen kann die Lieferzeit 7-14 Werktage betragen. Sie erhalten eine Bestätigungs-E-Mail mit Tracking-Informationen, sobald Ihre Bestellung versendet wurde."
    },
    {
      id: 4,
      question: "Kann ich meine Bestellung stornieren?",
      answer: "Ja, Sie können Ihre Bestellung innerhalb von 24 Stunden nach dem Kauf stornieren. Bitte kontaktieren Sie dazu umgehend unseren Kundenservice per E-Mail oder Telefon. Nach dieser Frist kann eine Stornierung nicht mehr garantiert werden, wenn die Bestellung bereits in Bearbeitung ist."
    },
    {
      id: 5,
      question: "Wie kann ich einen Artikel zurückgeben?",
      answer: (
        <div>
          <p>Sie haben das Recht, Artikel innerhalb von 14 Tagen nach Erhalt ohne Angabe von Gründen zurückzugeben. Für die Rückgabe benötigen Sie:</p>
          <ol>
            <li>Die Originalverpackung (wenn möglich)</li>
            <li>Den Kaufbeleg</li>
            <li>Das ausgefüllte Rücksendeformular</li>
          </ol>
          <p>Kontaktieren Sie unseren Kundenservice, um den Rücksendeprozess zu starten.</p>
        </div>
      )
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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

    const elements = faqContainerRef.current.querySelectorAll('.fade-in');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="faq-section" id="faq" ref={faqContainerRef}>
      <div className="faq-container">
        <h2 className="section-heading fade-in">Häufig gestellte Fragen</h2>
        {faqData.map((faq) => (
          <details
            key={faq.id}
            className="faq-item fade-in"
            open={openFAQ === faq.id}
          >
            <summary
              onClick={() => toggleFAQ(faq.id)}
            >
              {faq.question}
            </summary>
            <div className="faq-content">
              {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
