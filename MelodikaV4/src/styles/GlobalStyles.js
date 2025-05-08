import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes bounceIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.bounce-in {
  animation: bounceIn 1s ease-out;
}

  :root {
  /* Style light mode variables */
  --background-primary: #ffffff;
  --background-secondary: #f5f5f7;
  --text-primary: #1d1d1f;
  --text-secondary: #656565;
  --accent-color: #0071e3;
  --accent-hover: #0077ed;
  --border-color: #d2d2d7;
  --nav-height: 44px; 
  --footer-background: #f5f5f7;
  --card-background: #ffffff;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --gradient-start: #fbfbfd;
  --gradient-end: #f5f5f7;
}


[data-theme="dark"] {
  --background-primary: #121212;
  --background-secondary: #1e1e1e;
  --text-primary: #e0e0e0;
  --text-secondary: #a1a1a6;
  --accent-color: #bb86fc;
  --accent-hover: #cf9bff;
  --border-color: #333333;
  --footer-background: #1e1e1e;
  --card-background: #1e1e1e;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  --gradient-start: #121212;
  --gradient-end: #1e1e1e;
}
  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--accent-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
  }

  .scroll-to-top svg {
    fill: #ffffff;
    width: 24px;
    height: 24px;
  }

  .dark-mode-toggle {
  position: fixed;
  bottom: 80px; /* Position above the scroll-to-top button */
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: var(--background-primary);
  border: none;
  border-radius: 50%;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: all 0.3s ease;
}

.dark-mode-toggle:hover {
  transform: scale(1.1);
}

    .hero-section {
    background: linear-gradient(
      180deg,
      var(--gradient-start) 0%,
      var(--gradient-end) 100%
    );
    padding: 5rem 2rem;
    text-align: center;
    color: var(--text-primary);
  }

  .hero-section h1 {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  .hero-section p {
    font-size: 1.8rem;
    line-height: 1.6;
    margin-bottom: 3rem;
  }
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 62.5%; /* 10px base for easier rem calculations */
}

body {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--background-primary);
  color: var(--text-primary);
  line-height: 1.5;
  font-size: 1.6rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;
}


  @media screen and (max-width: 768px) {
    html {
      font-size: 56.25%; /* Adjust base font size for smaller screens */
    }

    body {
      font-size: 1.4rem;
    }

    .scroll-to-top {
      width: 40px;
      height: 40px;
    }

    .scroll-to-top svg {
      width: 20px;
      height: 20px;
    }
  }

  @media screen and (max-width: 480px) {
    html {
      font-size: 50%; /* Further adjust font size for very small screens */
    }

    .scroll-to-top {
      bottom: 15px;
      right: 15px;
    }
  }
`;

export default GlobalStyles;
