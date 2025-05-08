import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Footer from "./components/layout/Footer";
import AppRouter from "./routes/AppRouter"; 

const GlobalStyle = createGlobalStyle`
  :root {
    --accent-color: #007AFF;
    --accent-hover: #0056b3;
    --background-primary: #ffffff;
    --background-secondary: #f8f9fa;
    --text-primary: #333333;
    --text-secondary: #666666;
    --card-background: #ffffff;
    --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  [data-theme="dark"] {
    --background-primary: #000000;
    --background-secondary: #1d1d1f;
    --text-primary: #f5f5f7;
    --text-secondary: #a1a1a6;
    --accent-color: #2997ff;
    --accent-hover: #46abff;
    --card-background: #1d1d1f;
    --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
    background-color: var(--background-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .scroll-to-top {
    position: fixed;
    bottom: 90px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--background-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 900;
  }

  .scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
  }

  .scroll-to-top svg {
    width: 24px;
    height: 24px;
    fill: var(--text-primary);
  }

  .dark-mode-toggle {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--background-primary);
    border: none;
    border-radius: 50%;
    font-size: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 900;
    transition: all 0.3s ease;
  }

  .dark-mode-toggle:hover {
    transform: scale(1.1);
  }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Router>
      <GlobalStyle />
      <AppRouter />
      {/* <Footer /> */}
      
      {/* Scroll-to-Top Button */}
      <button
        className={`scroll-to-top ${showScrollToTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
      </button>

      {/* Dark Mode Toggle Button */}
      <button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
      >
        🌓
      </button>
    </Router>
  );
}

export default App;
