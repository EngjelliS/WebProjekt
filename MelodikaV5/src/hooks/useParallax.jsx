import { useCallback, useEffect, useState } from 'react';

export const useParallax = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const initParallax = useCallback((element) => {
    if (!element) return;
    
    const updateParallax = () => {
      const scrollPos = window.pageYOffset;
      element.style.backgroundPositionY = `${scrollPos * 0.5}px`;
    };
    
    window.addEventListener('scroll', updateParallax);
    
    // Initial call to set position
    updateParallax();
    
    return () => {
      window.removeEventListener('scroll', updateParallax);
    };
  }, []);
  
  return { scrollPosition, initParallax };
};

export default useParallax;