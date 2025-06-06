import fs from 'fs';
import path from 'path';
import { productsData } from '../src/pages/ProductDetails.jsx';

const outputDir = path.join('public', 'produkte');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

productsData.forEach(prod => {
  const html = `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8"/>
        <title>${prod.name}</title>
        <link rel="stylesheet" href="../style.css"/>
      </head>
      <body>
        <h1>${prod.name}</h1>
        <img src="../${prod.image.substring(1)}" alt="${prod.name}" width="300"/>
        <p>${prod.description}</p>
        <p>Preis: ${prod.priceText}</p>
        <a href="${prod.id > 1 ? prod.id-1 + '.html' : '#'}">Vorheriges</a> |
        <a href="${prod.id < productsData.length ? prod.id+1 + '.html' : '#'}">Nächstes</a><br/>
        <a href="../index.html">Zurück zur Startseite</a>
      </body>
    </html>
  `;
  fs.writeFileSync(path.join(outputDir, prod.id + '.html'), html);
});
