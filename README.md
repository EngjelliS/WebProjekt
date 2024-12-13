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
