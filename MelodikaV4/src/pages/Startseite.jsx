import { Fragment } from 'react';
import Hero from '../components/sections/Hero';
import ProductSlider from '../components/sections/ProductSlider';
import BrandShowcase from '../components/sections/BrandShowcase';
import styled from 'styled-components';

const Startseite = () => {
  return (
    <Fragment>
      {/* Hero Section with Parallax */}
      <Hero />

      {/* Featured Product with Sticky Scroll Effect */}
      <FeaturedProduct id="explore">
        <ProductStickyContainer>
          <StickyText>
            <h2 className="slide-in">Studiokopfhörer<br/>AudioPro HD</h2>
            <p className="slide-in">Klangqualität auf Studio-Niveau.<br/>Unvergleichliche Präzision.</p>
            <LearnMore href="/products/1" className="slide-in">Mehr erfahren &gt;</LearnMore>
          </StickyText>
          <StickyImage>
            <img src="/src/assets/Produkt1.jpeg" alt="Studiokopfhörer AudioPro HD" className="product-image scale-in" />
          </StickyImage>
        </ProductStickyContainer>
      </FeaturedProduct>

      {/* Product Gallery */}
      <ProductSlider />

      {/* Brand Promise Section */}
      <BrandPromise>
        <PromiseContent className="fade-in">
          <h2>Qualität in jedem Detail</h2>
          <p>Bei Melodika verschmelzen Innovation und Handwerkskunst zu Musikzubehör, das Ihre Kreativität auf ein neues Niveau hebt.</p>
        </PromiseContent>
      </BrandPromise>

      {/* Brand Showcase with Cards */}
      <BrandShowcase />
    </Fragment>
  );
};

const FeaturedProduct = styled.section`
  padding: 100px 20px;
  background-color: var(--background-primary);
`;

const ProductStickyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const StickyText = styled.div`
  h2 {
    font-size: 4.8rem;
    line-height: 1.1;
    margin-bottom: 20px;
    color: var(--text-primary);
  }

  p {
    font-size: 2.4rem;
    line-height: 1.4;
    color: var(--text-secondary);
    margin-bottom: 30px;
  }
`;

const LearnMore = styled.a`
  display: inline-block;
  color: var(--accent-color);
  font-size: 1.8rem;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(10px);
  }
`;

const StickyImage = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 18px;
  }
`;

const BrandPromise = styled.section`
  padding: 100px 20px;
  background-color: var(--background-secondary);
`;

const PromiseContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 4rem;
    margin-bottom: 20px;
    color: var(--text-primary);
  }

  p {
    font-size: 2rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }
`;

export default Startseite;