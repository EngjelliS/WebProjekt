
## Anleitung zur lokalen Installation

Um die Anwendung lokal auszuführen, befolgen Sie die folgenden Schritte:

---

### 1. Voraussetzungen installieren

Bevor Sie starten , stelle Sie sicher, dass folgende Software auf Ihrem Rechner installiert ist:

- **[Node.js](https://nodejs.org/)** (empfohlen: Version 18 oder höher)  
- **npm** (wird in der Regel automatisch mit Node.js installiert)

Sie können überprüfen, ob beide korrekt installiert sind, indem Sie folgende Befehle im Terminal eingeben:

```bash
node -v
npm -v
```
---

### 2. Projekt vorbereiten

Falls das Projekt als ZIP-Datei vorliegt:

1. Entpacke Sie die ZIP-Datei.
2. Wechsle Sie in das entpackte Projektverzeichnis, z. B.:

```bash
cd melodika
```

---

### 3. Abhängigkeiten installieren

Führe Sie im Projektverzeichnis folgenden Befehl aus, um alle benötigten Pakete zu installieren:

```bash
npm install
```

---

### 4. Entwicklungsserver starten

Starte Sie  nun den lokalen Entwicklungsserver mit:

```bash
npm run dev
```

Nach dem Start erscheint im Terminal ein Hinweis wie dieser:

```
➜  Local:   http://localhost:5173/
```

Sie können diesen Link in deinem Browser öffnen, um die Anwendung lokal zu testen.

## Zusätzlich verwendete Open Source Pakete
Neben den grundlegenden React- und Entwicklungs-Bibliotheken wurden im Projekt zwei zusätzliche Open Source Pakete eingesetzt, um die Funktionalität und Benutzerfreundlichkeit der Anwendung zu erweitern:

### 1. `framer-motion`
- **Kategorie:** Animation / UI-Verbesserung
- **Einsatzbereich:** Komponentenübergänge, Fade-in/Slide-in-Effekte beim Scrollen, visuelle Reaktionen auf Nutzerinteraktionen
- **Grund für den Einsatz:**  
  `framer-motion` wurde verwendet, um animierte UI-Elemente wie Produktkarten, Seiteninhalte oder Interaktionen geschmeidiger und moderner wirken zu lassen. Die Bibliothek bietet einfache, deklarative Animationen, die gut in React integrierbar sind – ohne manuell CSS-Animationen schreiben zu müssen.

### 2. `prop-types`
- **Kategorie:** Laufzeit-Typprüfung
- **Einsatzbereich:** Prüfung der übergebenen Props in Komponenten
- **Grund für den Einsatz:**  
  Mit `prop-types` lassen sich die erwarteten Datentypen von Props innerhalb von React-Komponenten definieren. Dadurch wird bereits zur Laufzeit vor möglichen Fehlern gewarnt (z. B. falsche Datentypen), was die Codequalität verbessert – besonders in reinen JavaScript-Projekten ohne TypeScript.

