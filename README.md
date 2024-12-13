# Webprojekt Melodika

## HTML und CSS

Jede HTML-Datei hat ihre eigene CSS-Datei. Diese ist jeweils genauso benannt wie die HTML-Datei, nur mit der Endung .css. Mit Ausnahme der Produktdetailseiten: Diese sechs Seiten teilen sich eine einzige CSS-Datei mit dem Namen produktdetails.css.


## Besonderheiten im Code

#### FAQ-Breich

Der FAQ-Bereich auf der Hilfeseite wurde mithilfe der HTML-Elemente "details" und "summary" gestaltet. Die Fragen werden dabei im "summary"-Tag hinterlegt, sodass sie auf den ersten Blick sichtbar sind. Beim Anklicken einer Frage wird die dazugehörige Antwort ausgeklappt und unterhalb des "summary"-Tags angezeigt.

#### Beispiel:

```html
<details class="frage-element">
   <summary>1. Wie kann ich ein Produkt bestellen?</summary>
   <p>Um ein Produkt zu bestellen, wählen Sie das gewünschte Produkt aus, fügen es Ihrem Warenkorb hinzu und gehen Sie zur Kasse.</p>
</details>
```
#### CSS FAQ Beispiel:
Der rechte Pfeil wird beim klicken auf das Feld um 180 Grad gedreht.
```css
.frage-element[open] summary::after {
    transform: rotate(180deg);
}
```
 Der CSS-Code sorgt dafür, dass das ::after-Pseudo-Element eines "summary"-Tags um 180 Grad gedreht wird, wenn das zugehörige "details"-Element geöffnet ist (open).

#### Scroll to Top Button

 Auf jeder Seite befindet sich unten rechts ein Button, der die Nutzer beim Anklicken direkt zurück zum Seitenanfang führt. Dieser ist wiefolgt mit HTML eingebunden:

 ```html
<a href="#top" class="scroll-to-top" title="Zurück nach oben">⬆</a>
 ```
Der Code erzeugt einen Link mit einem nach oben zeigenden Pfeil (⬆), der den Nutzer beim Anklicken zum Seitenanfang scrollt (über href="#top").

Der Button wird durch CSS gestaltet und fest in der rechten unteren Ecke der Seite positioniert:

```css
.scroll-to-top {
    position: fixed; /* Der Button bleibt an einer festen Position auf der Seite, unabhängig vom Scrollen. */
    bottom: 20px; /* Abstand von 20px zum unteren Rand des Fensters. */
    right: 20px; /* Abstand von 20px zum rechten Rand des Fensters. */
    background-color: #253F62; 
    color: #fff; 
    font-size: 24px; 
    text-align: center; 
    line-height: 50px; 
    height: 50px; 
    width: 50px; 
    border-radius: 50%; 
    text-decoration: none; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4); 
    transition: all 0.3s ease-in-out; 
    z-index: 20; 
}
```

### Slider

Der Slider wird durch die radio-buttons Logik in HTML und die checked Logik in CSS etabliert. Es werden bestimmte werte ( in unserem Beispiel 0%, -100%, -200% ) mit den Radio buttons versehen. Sobald ein Button gechecked wird, ruft die CSS die nötige position ab, und slidet auf den Gewünschten bereich
```html
        <section class="product-slider">
            <h2>Empfohlene Produkte</h2>
            <div class="slider-wrapper">
                <input type="radio" name="slider" id="slide1" checked>
                <input type="radio" name="slider" id="slide2">
                <input type="radio" name="slider" id="slide3">
                <div class="slides">
                    <div class="slide">
                <img src="Produkt1.jpeg" width="300px" height="300px" align="center" alt="Studiokopfhörer AudioPro HD">
                <h3>Studiokopfhörer AudioPro HD</h3>
                <p>Klangqualität auf Studio-Niveau für präzises Hören und Mischen</p>
                <a href="produktdetails1.html" class="cta-button">Mehr erfahren</a>
            </div>
            <div class="slide">
                <img src="Produkt2.jpeg" width="300px" height="300px" align="center" alt="Mikrofonstativ FlexiMic Stand">
                <h3>Mikrofonstativ FlexiMic Stand</h3>
                <p>Robustes, höhenverstellbares Stativ für eine Vielzahl von Anwendungen</p>
                <a href="produktdetails2.html" class="cta-button">Mehr erfahren</a>
            </div>
            <div class="slide">
                <img src="Produkt3.jpeg" width="300px" height="300px" align="center" alt="Gitarren-Tuner TuneMate Pro">
                <h3>Gitarren-Tuner TuneMate Pro</h3>
                <p>Kompakter Clip-On-Tuner für Gitarren, Bässe und Ukulelen</p>
                <a href="produktdetails3.html" class="cta-button">Mehr erfahren</a>
            </div>
        </div>
    </div>
</section>
```
```css

#slide1:checked ~ .slides {
  transform: translateX(0);
}

#slide2:checked ~ .slides {
  transform: translateX(-100%);
}

#slide3:checked ~ .slides {
  transform: translateX(-200%);
}
```
### Burger Menü

Die Navigationsleiste wird per mediaquary ab einem wert von 1000px ausgeblendet. in der gleichen mediaquary wird dann ein Hamburger menü eingeblendet, welches sich durch klicken öffnen und schließen lässt.
Hier wird wieder über die "checked" logik in html und css überprüft, ob das menü angeklickt wurde oder nicht. 
```html
 <nav class="navbar">
        <input type="checkbox" id="menu-toggle" class="menu-toggle-checkbox">
        <label for="menu-toggle" class="menu-toggle-label">&#9776;</label>
        <ul class="nav-links">
            <li><a href="index.html">Startseite</a></li>
            <li><a href="produkte.html">Produkte</a></li>
            <li><a href="bestelluebersicht.html">Bestellübersicht</a></li>
            <li><a href="hilfe.html">Hilfe</a></li>
            <li><a href="ueber-uns.html">Über uns</a></li>
            <li><a href="warenkorb.html"><img src="warenkorbicon.png" alt="Warenkorb" class="nav-icon"></a></li>
            <li><a href="anmeldung.html"><img src="loginicon1.png" alt="Login" class="nav-icon"></a></li>
        </ul>
    </nav>
```
```css
@media screen and (max-width: 1000px) {
  .nav-links {
    display: flex;
    flex-direction: column;
    background-color: rgba(37, 63, 98, 0.8);
    position: fixed;
    top: 20px;
    right: -100%;
    z-index: 15;
    width: 40%;
    padding: 10px 0;
    transition: transform 0.5s ease, right 0.5s ease;
  }

  .menu-toggle-checkbox:checked + .menu-toggle-label + .nav-links {
    right: 70px;
    transform: translateX(0);
  }

  .menu-toggle-label {
    display: block;
  }

  .nav-links li {
    margin: 10px 0;
    text-align: center;
  }
}
```
Desweiteren wird das Menü wieder über die checked logik in den Sichtbereich hereingeschoben.
