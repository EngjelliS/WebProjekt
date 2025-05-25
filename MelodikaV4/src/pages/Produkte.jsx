import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // ✅ Hinzugefügt

const products = [
  {
    id: 1,
    name: "Studiokopfhörer AudioPro HD",
    price: "199,99 €",
    description: "Klangqualität auf Studio-Niveau für präzises Hören und Mischen",
    fullDescription: "Der AudioPro HD bietet erstklassige Klangqualität für professionelle Anwendungen. Mit seinen hochwertigen 40mm-Treibern und dem ergonomischen Design ermöglicht er stundenlanges, ermüdungsfreies Arbeiten im Studio.",
    image: "/src/assets/Produkt1.jpeg",
    features: [
      "40mm High-Definition-Treiber",
      "Geschlossene Bauweise",
      "Abnehmbares Kabel",
      "Faltbares Design"
    ],
    specs: {
      "Frequenzbereich": "20Hz - 20kHz",
      "Impedanz": "32 Ohm",
      "Gewicht": "250g"
    }
  },
  // Weitere Produkte können hier ergänzt werden...
];

const Produkte = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];

  const { addToCart } = useCart(); // ✅ Hook aus dem Kontext

  return (
    <ProductPageContainer>
      <ProductGrid>
        <ProductImage>
          <img src={product.image} alt={product.name} />
        </ProductImage>
        
        <ProductInfo>
          <h1>{product.name}</h1>
          <Price>{product.price}</Price>
          <Description>{product.fullDescription}</Description>
          
          <FeaturesSection>
            <h2>Features</h2>
            <FeaturesList>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </FeaturesList>
          </FeaturesSection>

          <SpecsSection>
            <h2>Technische Daten</h2>
            <SpecsGrid>
              {Object.entries(product.specs).map(([key, value]) => (
                <SpecRow key={key}>
                  <SpecLabel>{key}:</SpecLabel>
                  <SpecValue>{value}</SpecValue>
                </SpecRow>
              ))}
            </SpecsGrid>
          </SpecsSection>

          <AddToCartButton onClick={() => addToCart({ 
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1 
          })}>
            In den Warenkorb
          </AddToCartButton>
        </ProductInfo>
      </ProductGrid>
    </ProductPageContainer>
  );
};

// Styling unverändert – wie in deiner Originaldatei
const ProductPageContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
  }
`;

const ProductInfo = styled.div`
  h1 {
    font-size: 3.6rem;
    margin-bottom: 20px;
    color: var(--text-primary);
  }

  h2 {
    font-size: 2.4rem;
    margin: 30px 0 20px;
    color: var(--text-primary);
  }
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 30px;
`;

const FeaturesSection = styled.div`
  margin-bottom: 40px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  
  li {
    font-size: 1.6rem;
    color: var(--text-secondary);
    margin-bottom: 10px;
    padding-left: 24px;
    position: relative;

    &::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--accent-color);
    }
  }
`;

const SpecsSection = styled.div`
  margin-bottom: 40px;
`;

const SpecsGrid = styled.div`
  display: grid;
  gap: 15px;
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  font-size: 1.6rem;
`;

const SpecLabel = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;

const SpecValue = styled.span`
  color: var(--text-secondary);
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 15px 30px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
  }
`;

export default Produkte;
