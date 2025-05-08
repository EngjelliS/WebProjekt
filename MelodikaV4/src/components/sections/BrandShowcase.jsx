import styled from 'styled-components';
import markeA from '../../assets/MarkeA.jpg';
import markeB from '../../assets/MarkeB.jpg';
import markeC from '../../assets/MarkeC.jpg';
const brands = [
  {
    id: 1,
    title: 'Innovation & Qualität',
    description: 'Erstklassige Markenprodukte',
    image: markeA,
  },
  {
    id: 2,
    title: 'Tradition trifft Moderne', 
    description: 'Jahrelange Erfahrung in der Musikbranche',
    image: markeB,
  },
  {
    id: 3,
    title: 'Perfekter Sound',
    description: 'Hochwertige Audioqualität für jeden Anspruch',
    image: markeC,
  },
];

const BrandShowcase = () => {
  return (
    <ShowcaseSection>
      <SectionTitle>Unsere Marken</SectionTitle>
      <BrandGrid>
        {brands.map((brand) => (
          <BrandCard key={brand.id}>
            <BrandImage src={brand.image} alt={brand.title} />
            <BrandContent>
              <BrandTitle>{brand.title}</BrandTitle>
              <BrandDescription>{brand.description}</BrandDescription>
            </BrandContent>
          </BrandCard>
        ))}
      </BrandGrid>
    </ShowcaseSection>
  );
};

const ShowcaseSection = styled.section`
  padding: 100px 20px;
  background-color: var(--background-primary);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 4rem;
  margin-bottom: 60px;
  color: var(--text-primary);
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BrandCard = styled.div`
  background-color: var(--card-background);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const BrandImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BrandContent = styled.div`
  padding: 30px;
`;

const BrandTitle = styled.h3`
  font-size: 2.4rem;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const BrandDescription = styled.p`
  font-size: 1.6rem;
  color: var(--text-secondary);
`;

export default BrandShowcase;