import { useRef, useEffect, useState } from 'react';

const BrandPromise = () => {
  const promiseRef = useRef(null);
  const [gradientPosition, setGradientPosition] = useState(0);

  // Intersection Observer für Fade-In-Effekt
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    if (promiseRef.current) {
      observer.observe(promiseRef.current);
    }

    return () => {
      if (promiseRef.current) {
        observer.unobserve(promiseRef.current);
      }
    };
  }, []);

  // Animierter Gradient-Hintergrund
  useEffect(() => {
    let animationFrameId;
    let position = 0;

    const animateGradient = () => {
      position += 0.5;
      setGradientPosition(position);
      animationFrameId = requestAnimationFrame(animateGradient);
    };

    animationFrameId = requestAnimationFrame(animateGradient);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const gradientStyle = {
    background: `linear-gradient(${gradientPosition}deg, var(--gradient-start), var(--gradient-end))`
  };

  return (
    <section className="brand-promise" style={gradientStyle}>
      <div className="promise-content fade-in" ref={promiseRef}>
        <h2>Qualität in jedem Detail</h2>
        <p>Bei Melodika verschmelzen Innovation und Handwerkskunst zu Musikzubehör, das Ihre Kreativität auf ein neues Niveau hebt.</p>
      </div>
    </section>
  );
};

export default BrandPromise;