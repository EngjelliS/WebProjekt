import { useState, useEffect } from 'react';

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call handler right away so state gets updated with initial window position
    handleScroll();
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return { scrollY };
};

export default useScroll;