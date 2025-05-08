import styled from 'styled-components';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "Studiokopfhörer AudioPro HD",
    price: "199,99 €",
    description: "Klangqualität auf Studio-Niveau für präzises Hören und Mischen",
    image: "/src/assets/Produkt1.jpeg"
  },
  {
    id: 2,
    name: "Mikrofonstativ FlexiMic Stand",
    price: "79,99 €",
    description: "Robustes, höhenverstellbares Stativ für eine Vielzahl von Anwendungen",
    image: "/src/assets/Produkt2.jpeg"
  },
  {
    id: 3,
    name: "Gitarren-Tuner TuneMate Pro",
    price: "29,99 €",
    description: "Präziser digitaler Tuner für alle Saiteninstrumente",
    image: "/src/assets/Produkt3.jpeg"
  },
  {
    id: 4,
    name: "Digitales Metronom TempoMaster Pro",
    price: "39,99 €",
    description: "Professionelles digitales Metronom mit vielfältigen Funktionen",
    image: "/src/assets/Produkt4.jpeg"
  },
  {
    id: 5,
    name: "Keyboard-Pedal ProSustain FX",
    price: "49,99 €",
    description: "Hochwertiges Sustain-Pedal für Keyboards und Digitalpianos",
    image: "/src/assets/Produkt5.jpeg"
  },
  {
    id: 6,
    name: "Gitarren-Effektpedal RockRiot Distortion X",
    price: "89,99 €",
    description: "Vielseitiges Distortion-Pedal für kraftvolle Gitarrensounds",
    image: "/src/assets/Produkt6.jpeg"
  }
];

const ProductSlider = () => {
  return (
    <ProductSection id="products">
      <SectionTitle>Unsere Produkte</SectionTitle>
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductContent>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>{product.price}</ProductPrice>
              <ProductButton to={`/produkte/${product.id}`}>
                Mehr erfahren
              </ProductButton>
            </ProductContent>
          </ProductCard>
        ))}
      </ProductGrid>
    </ProductSection>
  );
};

const ProductSection = styled.section`
  padding: 100px 20px;
  background-color: var(--background-secondary);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 4rem;
  margin-bottom: 60px;
  color: var(--text-primary);
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductCard = styled.div`
  background-color: var(--card-background);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductContent = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  font-size: 2rem;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const ProductDescription = styled.p`
  font-size: 1.4rem;
  color: var(--text-secondary);
  margin-bottom: 15px;
`;

const ProductPrice = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 20px;
`;

const ProductButton = styled(Link)`
  display: inline-block;
  background-color: var(--accent-color);
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1.4rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
  }
`;

export default ProductSlider;