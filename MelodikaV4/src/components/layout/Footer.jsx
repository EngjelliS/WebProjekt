import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Melodika</FooterTitle>
          <FooterText>
            Ihr vertrauenswürdiger Partner für hochwertige Musikinstrumente und
            Zubehör
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Navigation</FooterTitle>
          <FooterNav>
            <FooterLink to="/">Startseite</FooterLink>
            <FooterLink to="/produkte">Produkte</FooterLink>
            <FooterLink to="/bestelluebersicht">Bestellübersicht</FooterLink>
            <FooterLink to="/hilfe">Hilfe</FooterLink>
          </FooterNav>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Rechtliches</FooterTitle>
          <FooterNav>
            <FooterLink to="/impressum">Impressum</FooterLink>
            <FooterLink to="/datenschutz">Datenschutz</FooterLink>
            <FooterLink to="/agb">AGB</FooterLink>
          </FooterNav>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Kontakt</FooterTitle>
          <ContactInfo>
            <p>Email: info@melodika.de</p>
            <p>Tel: +49 123 456789</p>
            <p>Adresse: Musikstraße 1, 12345 Berlin</p>
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>© 2024 Melodika. Alle Rechte vorbehalten.</Copyright>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <p style={{ color: "red", fontWeight: "bold" }}>
            ⚠️ Achtung! Dies ist ein studentisches Projekt! Wir übernehmen keine
            Haftung!
          </p>
        </div>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: var(--footer-background);
  padding: 60px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  color: var(--text-primary);
  font-size: 2rem;
  margin-bottom: 20px;
`;

const FooterText = styled.p`
  color: var(--text-secondary);
  font-size: 1.4rem;
  line-height: 1.5;
`;

const FooterNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1.4rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const ContactInfo = styled.div`
  color: var(--text-secondary);
  font-size: 1.4rem;
  line-height: 1.8;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 20px;
  border-top: 1px solid var(--border-color);
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 1.4rem;
  text-align: center;
`;

export default Footer;
