import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ProductFeatures from '../components/ProductFeatures';
import TechnicalSpecs from '../components/TechnicalSpecs';
import RelatedProducts from '../components/RelatedProducts';
import CallToAction from '../components/CallToAction';
import ProductHero from '../components/ProductHero';

// Exportiere die Produktdaten damit sie in anderen Komponenten verwendet werden können
export const productsData = [
  {
    id: 1,
    name: "Studiokopfhörer AudioPro HD",
    description: "Klangqualität auf Studio-Niveau für präzises Hören",
    price: 149.99,
    priceText: "149,99 €",
    deliveryInfo: "Lieferung: 3-5 Werktage",
    image: "/Produkt1.jpeg",
    features: [
      {
        title: "Klangqualität auf Studio-Niveau",
        description: "Präzises Hören und Mischen mit professioneller Klangwiedergabe",
        icon: "headphones"
      },
      {
        title: "Ergonomisches Design",
        description: "Für lange Studio-Sessions konzipiert, bietet höchsten Komfort",
        icon: "design"
      },
      {
        title: "Gepolsterte Ohrmuscheln",
        description: "Sorgen für Komfort und effektive Lärmisolierung",
        icon: "equalizer"
      },
      {
        title: "Einstellbares Kopfband",
        description: "Aus strapazierfähigem Material für optimale Passform",
        icon: "battery"
      }
    ],
    specs: [
      { name: "Treiber", value: "40 mm Neodym-Dynamiktreiber" },
      { name: "Frequenzbereich", value: "10 Hz - 24 kHz" },
      { name: "Impedanz", value: "32 Ohm" },
      { name: "Empfindlichkeit", value: "105 dB SPL/mW" },
      { name: "Kabel", value: "3 m, abnehmbar" },
      { name: "Gewicht", value: "295 g (ohne Kabel)" }
    ],
    relatedProducts: [6, 5, 3]
  },
  {
    id: 2,
    name: "Mikrofonstativ FlexiMic Stand",
    description: "Professionelles USB-Mikrofon für Streaming und Aufnahmen",
    price: 129.99,
    priceText: "129,99 €",
    deliveryInfo: "Lieferung: 2-4 Werktage",
    image: "/Produkt2.jpeg",
    features: [
      {
        title: "Kristallklare Aufnahmequalität",
        description: "Ideal für Podcasts, Streaming und Gesangsaufnahmen",
        icon: "headphones"
      },
      {
        title: "Plug-and-Play USB-Anschluss",
        description: "Einfache Einrichtung ohne zusätzliche Treiber",
        icon: "design"
      },
      {
        title: "Einstellbare Richtcharakteristik",
        description: "Flexibilität für verschiedene Aufnahmeszenarien",
        icon: "equalizer"
      },
      {
        title: "Integrierter Kopfhöreranschluss",
        description: "Latenzfreies Monitoring während der Aufnahme",
        icon: "battery"
      }
    ],
    specs: [
      { name: "Kapseltyp", value: "Kondensator" },
      { name: "Richtcharakteristik", value: "Niere, Kugel, Acht, Stereo" },
      { name: "Frequenzbereich", value: "20 Hz - 20 kHz" },
      { name: "Bitrate", value: "24-bit/96kHz" },
      { name: "Anschluss", value: "USB-C" },
      { name: "Gewicht", value: "325 g" }
    ],
    relatedProducts: [1, 3, 4]
  },
  {
    id: 3,
    name: "Gitarren-Tuner TuneMate Pro",
    description: "Kompakter Clip-On-Tuner für Saiteninstrumente",
    price: 19.99,
    priceText: "19,99 €",
    deliveryInfo: "Lieferung: 1-3 Werktage",
    image: "/Produkt3.jpeg",
    features: [
      {
        title: "Hochpräzise Stimmgenauigkeit",
        description: "Schnelles und genaues Stimmen aller Saiteninstrumente",
        icon: "headphones"
      },
      {
        title: "Kompaktes Clip-Design",
        description: "Einfach am Instrument zu befestigen und diskret zu nutzen",
        icon: "design"
      },
      {
        title: "Großes farbiges Display",
        description: "Klare Anzeige für einfaches Ablesen in allen Lichtverhältnissen",
        icon: "equalizer"
      },
      {
        title: "Langlebige Batterie",
        description: "Lange Nutzungsdauer für zuverlässigen Einsatz",
        icon: "battery"
      }
    ],
    specs: [
      { name: "Stimmbereich", value: "A0 (27,5 Hz) - C8 (4186 Hz)" },
      { name: "Genauigkeit", value: "±0,5 Cent" },
      { name: "Modi", value: "Chromatisch, Gitarre, Bass, Violine, Ukulele" },
      { name: "Kalibrierung", value: "430-450 Hz" },
      { name: "Stromversorgung", value: "CR2032 Knopfzelle" },
      { name: "Gewicht", value: "25 g" }
    ],
    relatedProducts: [1, 4, 6]
  },
  {
    id: 4,
    name: "Digitales Metronom TempoMaster Pro",
    description: "Digitales Metronom mit präziser Taktgebung",
    price: 29.99,
    priceText: "29,99 €",
    deliveryInfo: "Lieferung: 1-3 Werktage",
    image: "/Produkt4.jpeg",
    features: [
      {
        title: "Hochpräzise Taktgebung",
        description: "Exakte Rhythmusführung für optimales Üben",
        icon: "headphones"
      },
      {
        title: "Vielfältige Taktarten",
        description: "Unterstützt einfache bis komplexe Taktarten",
        icon: "design"
      },
      {
        title: "Visuelles Feedback",
        description: "LED-Anzeige für zusätzliche visuelle Unterstützung",
        icon: "equalizer"
      },
      {
        title: "Robustes Design",
        description: "Perfekt für unterwegs und den täglichen Gebrauch",
        icon: "battery"
      }
    ],
    specs: [
      { name: "Tempobereich", value: "30-250 BPM" },
      { name: "Taktarten", value: "0-9 Beats pro Takt" },
      { name: "Rhythmusmuster", value: "8 verschiedene Muster" },
      { name: "Lautstärke", value: "3 Stufen + Stummschaltung" },
      { name: "Stromversorgung", value: "2x AAA Batterien" },
      { name: "Gewicht", value: "120 g" }
    ],
    relatedProducts: [3, 5, 6]
  },
  {
    id: 5,
    name: "Keyboard-Pedal ProSustain FX",
    description: "Präzises Sustain-Pedal für Keyboards",
    price: 59.99,
    priceText: "59,99 €",
    deliveryInfo: "Lieferung: 2-4 Werktage",
    image: "/Produkt5.jpeg",
    features: [
      {
        title: "Präzise Ansprache",
        description: "Feinfühliges Ansprechen für nuanciertes Spiel",
        icon: "headphones"
      },
      {
        title: "Rutschfestes Design",
        description: "Stabiler Stand während des Spielens",
        icon: "design"
      },
      {
        title: "Universelle Kompatibilität",
        description: "Passend für die meisten Keyboards und Digitalpianos",
        icon: "equalizer"
      },
      {
        title: "Robuste Konstruktion",
        description: "Langlebiges Metallgehäuse für jahrelangen Einsatz",
        icon: "battery"
      }
    ],
    specs: [
      { name: "Typ", value: "Halbdämpferpedal" },
      { name: "Anschluss", value: "6,3 mm Klinkenstecker" },
      { name: "Kabellänge", value: "2,5 m" },
      { name: "Polarität", value: "Umschaltbar (normal/invers)" },
      { name: "Material", value: "Metall/Gummi" },
      { name: "Gewicht", value: "780 g" }
    ],
    relatedProducts: [4, 1, 6]
  },
  {
    id: 6,
    name: "Gitarren-Effektpedal RockRiot Distortion X",
    description: "Vielseitiges Effektpedal für Gitarren",
    price: 89.99,
    priceText: "89,99 €",
    deliveryInfo: "Lieferung: 2-4 Werktage",
    image: "/Produkt6.jpeg",
    features: [
      {
        title: "Kraftvoller Distortion-Sound",
        description: "Von sanfter Übersteuerung bis zu extremer Verzerrung",
        icon: "headphones"
      },
      {
        title: "Vielseitige Klangregelung",
        description: "Level-, Gain-, Ton- und Presence-Regler",
        icon: "design"
      },
      {
        title: "True Bypass",
        description: "Kein Signalverlust im ausgeschalteten Zustand",
        icon: "equalizer"
      },
      {
        title: "Robustes Metallgehäuse",
        description: "Für den harten Bühneneinsatz konzipiert",
        icon: "battery"
      }
    ],
    specs: [
      { name: "Effekttyp", value: "Distortion/Overdrive" },
      { name: "Regler", value: "Level, Gain, Ton, Presence" },
      { name: "Bypass", value: "True Bypass" },
      { name: "Stromversorgung", value: "9V DC (Netzteil oder Batterie)" },
      { name: "Anschlüsse", value: "Input, Output (6,3 mm Klinke)" },
      { name: "Gewicht", value: "350 g" }
    ],
    relatedProducts: [3, 1, 5]
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const [cartAnimationActive, setCartAnimationActive] = useState(false);

  useEffect(() => {
    // Simuliere einen API-Aufruf mit einem Timeout
    setIsLoading(true);
    
    setTimeout(() => {
      const productId = parseInt(id);
      const foundProduct = productsData.find(prod => prod.id === productId);
      setProduct(foundProduct);
      setIsLoading(false);
      
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }, 300);
  }, [id]);

  // Funktion zum Hinzufügen eines Produkts zum Warenkorb
  const addToCart = () => {
    if (!product) return;
    
    // Hole aktuellen Warenkorb aus dem localStorage oder initialisiere neuen Warenkorb
    let cart = JSON.parse(localStorage.getItem('melodikaCart')) || [];
    
    // Prüfe ob Produkt bereits im Warenkorb ist
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
      // Erhöhe Menge wenn Produkt bereits vorhanden
      cart[existingProductIndex].quantity += 1;
    } else {
      // Füge neues Produkt hinzu
      cart.push({
        id: product.id,
        quantity: 1
      });
    }
    
    // Update Warenkorb im localStorage
    localStorage.setItem('melodikaCart', JSON.stringify(cart));
    
    // Zeige Animation
    setCartAnimationActive(true);
    
    // Reset Animation nach 2 Sekunden
    setTimeout(() => {
      setCartAnimationActive(false);
    }, 2000);
  };

  // Zeige Lade-Indikator während Daten geladen werden
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Produkt wird geladen...</p>
      </div>
    );
  }

  // Zeige Fehlermeldung wenn Produkt nicht gefunden wurde
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Produkt nicht gefunden</h2>
        <p>Leider konnte das gesuchte Produkt nicht gefunden werden.</p>
        <Link to="/produkte" className="back-button">Zurück zu allen Produkten</Link>
      </div>
    );
  }

  // Erzeuge Array der verwandten Produkte basierend auf IDs
  const relatedProductsData = product.relatedProducts
    .map(relId => productsData.find(p => p.id === relId))
    .filter(p => p); // Filtere undefined Werte

  return (
    <main className="product-details-page">
      <ProductHero 
        product={product} 
        onAddToCart={addToCart}
        isAddingToCart={cartAnimationActive}
      />
      
      <ProductFeatures features={product.features} />
      
      <TechnicalSpecs specs={product.specs} />
      
      <RelatedProducts products={relatedProductsData} />
      
      <CallToAction 
        title="Bereit für den perfekten Klang?"
        subtitle="Erlebe Studio-Qualität, wie sie sein sollte."
        buttonText="In den Warenkorb"
        onButtonClick={addToCart}
        secondaryLinkText="Andere Produkte entdecken"
        secondaryLinkUrl="/produkte"
        isAddingToCart={cartAnimationActive}
      />
    </main>
  );
};

export default ProductDetails;