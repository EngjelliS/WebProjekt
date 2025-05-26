import React, { useEffect, useRef } from 'react';

const HelpTopics = () => {
  const topicsContainerRef = useRef(null);

  const topics = [
    {
      id: 1,
      title: "Konto & Sicherheit",
      description: "Verwalten Sie Ihr Konto und erhöhen Sie die Sicherheit",
      icon: (
        <svg viewBox="0 0 24 24" className="topic-svg">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Versand & Lieferung",
      description: "Informationen zu Versandoptionen und Lieferzeiten",
      icon: (
        <svg viewBox="0 0 24 24" className="topic-svg">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Problembehebung",
      description: "Lösungen für häufige technische Probleme",
      icon: (
        <svg viewBox="0 0 24 24" className="topic-svg">
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Feedback",
      description: "Teilen Sie uns Ihre Erfahrungen und Verbesserungsvorschläge mit",
      icon: (
        <svg viewBox="0 0 24 24" className="topic-svg">
          <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
        </svg>
      )
    }
  ];

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

    const elements = topicsContainerRef.current.querySelectorAll('.fade-in');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="help-topics" ref={topicsContainerRef}>
      <div className="topics-container">
        <h2 className="section-heading fade-in">Hilfe-Themen</h2>

        <div className="topics-grid">
          {topics.map((topic) => (
            <div key={topic.id} className="topic-item fade-in">
              <div className="topic-icon">
                {topic.icon}
              </div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <a href="#" className="learn-more">Mehr erfahren &gt;</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpTopics;
