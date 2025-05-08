import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Animation Keyframes */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateX(-50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  /* Animation Classes */
  .fade-in {
    animation: fadeIn 1s ease-out;
  }

  .slide-in {
    animation: slideIn 1s ease-out;
  }

  .scale-in {
    animation: scaleIn 1s ease-out;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider>
      <App /> {/* Wrap App component with ThemeProvider */}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
