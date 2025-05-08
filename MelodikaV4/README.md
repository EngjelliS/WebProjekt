# Melodika Website - React Version

## Project Structure
MelodikaV4/
│
├── public/                    # Statische Dateien (z. B. index.html, Favicon)
│
├── src/                       # Hauptquellcode
│   ├── assets/                # Bilder, Icons, Logos etc.
│   ├── components/            # Wiederverwendbare UI-Komponenten
│   │   ├── Header/            # Header + Navigation
│   │   │   ├── Header.jsx     
│   │   │   ├── Navigation.jsx 
│   │   ├── Footer/            # Footer-Komponente
│   │   ├── ScrollToTop.jsx    # Button zum Hochscrollen
│   │   ├── DarkModeToggle.jsx # Toggle-Button für Darkmode
│   │   └── ...                # Weitere Komponenten
│   │
│   ├── context/               # React Contexts
│   │   └── ThemeContext.jsx   # Dark-/Lightmode Context
│   │
│   ├── pages/                 # Seitenrouten
│   │   ├── Startseite.jsx
│   │   ├── Produkte.jsx
│   │   ├── Hilfe.jsx
│   │   └── ...                # Weitere Seiten
│   │
│   ├── styles/                # Globale und themenspezifische Styles
│   │   └── GlobalStyles.js    # Globale CSS-Regeln & Variablen
│   │
│   ├── App.jsx                # Haupt-Komponentenbaum
│   ├── main.jsx               # Einstiegspunkt der App (ReactDOM)
│   └── router.jsx             # React-Router Setup (falls vorhanden)
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.js            # Vite Konfiguration
