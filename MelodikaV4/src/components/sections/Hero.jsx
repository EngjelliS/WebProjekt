import styled from "styled-components";
import backgroundImage from "../../assets/Hintergrundbild.png";


const Hero = () => {
  return (
    <HeroParallax>
      <ParallaxContent>
        <h1 className="fade-in">Klanginnovation neu definiert</h1>
        <p className="fade-in">Entdecken Sie Musikzubehör in seiner vollendeten Form.</p>
        <StyledButton href="#explore" className="fade-in">Entdecken</StyledButton>
      </ParallaxContent>
    </HeroParallax>
  );
};

const HeroParallax = styled.section`
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  }
`;

const ParallaxContent = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
  padding: 0 20px;
  max-width: 800px;

  h1 {
    font-size: 5.6rem;
    font-weight: 600;
    margin-bottom: 20px;
    line-height: 1.1;
  }

  p {
    font-size: 2.6rem;
    font-weight: 400;
    margin-bottom: 30px;
  }
`;

const StyledButton = styled.a`
  display: inline-block;
  background-color: var(--accent-color);
  color: white;
  padding: 15px 30px;
  border-radius: 980px;
  text-decoration: none;
  font-sizfont-weight: 500;
e: 1.8rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
  }
`;

export default Hero;