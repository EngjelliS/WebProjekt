import { Link } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./Navigation";
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <NavWrapper>
          <LogoWrapper>
            <Link to="/">
              <Logo src="/src/assets/Firmenlogo.png" alt="Melodika" />
            </Link>
          </LogoWrapper>

          <Navigation />

          <NavActions>
            <CartIcon to="/warenkorb">🛒</CartIcon>
            <UserIcon to="/anmeldung">👤</UserIcon>
          </NavActions>
        </NavWrapper>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--background-primary);
  z-index: 1000;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const Nav = styled.nav`
  height: var(--nav-height);
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 22px;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 24px;
  width: auto;
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
`;

const NavItem = styled.li`
  a {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 1.4rem;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
  }
`;
const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ThemeButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 5px;
`;
const CartIcon = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
`;

const UserIcon = styled(CartIcon)``;

export default Header;
