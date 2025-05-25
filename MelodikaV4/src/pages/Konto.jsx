import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const Konto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email);

  if (!user) return <Main><p style={{ textAlign: 'center' }}>Benutzer nicht gefunden.</p></Main>;

  return (
    <Main>
      <AuthHeroParallax>
        <ParallaxContent>
          <h1 className="fade-in">Mein Konto</h1>
          <p className="fade-in">Willkommen zurück, {user.name}!</p>
        </ParallaxContent>
      </AuthHeroParallax>

      <AuthContainer>
        <AccountCard>
          <h2>Kontoinformationen</h2>
          <InfoItem><strong>Name:</strong> {user.name}</InfoItem>
          <InfoItem><strong>E-Mail:</strong> {user.email}</InfoItem>

          <LogoutButton onClick={() => navigate('/')}>Abmelden</LogoutButton>
        </AccountCard>
      </AuthContainer>
    </Main>
  );
};

export default Konto;

const Main = styled.main``;

const AuthHeroParallax = styled.section`
  height: 50vh;
  background-image: url('/src/assets/Hintergrundbild.png');
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
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  }
`;

const ParallaxContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ffffff;

  h1 {
    font-size: 4.8rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  p {
    font-size: 2.4rem;
    font-weight: 400;
  }
`;

const AuthContainer = styled.section`
  max-width: 600px;
  margin: 40px auto 100px;
  padding: 0 20px;
`;

const AccountCard = styled.div`
  background-color: var(--card-background);
  box-shadow: var(--card-shadow);
  border-radius: 20px;
  padding: 40px;
  color: var(--text-primary);

  h2 {
    font-size: 2.4rem;
    margin-bottom: 30px;
    text-align: center;
  }
`;

const InfoItem = styled.p`
  font-size: 1.6rem;
  margin-bottom: 15px;

  strong {
    color: var(--text-secondary);
    margin-right: 5px;
  }
`;

const LogoutButton = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 15px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
  }
`;
