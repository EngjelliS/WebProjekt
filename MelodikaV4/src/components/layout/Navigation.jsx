import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = () => (
  <NavMenu>
    <NavItem><Link to="/">Startseite</Link></NavItem>
    <NavItem><Link to="/produkte">Produkte</Link></NavItem>
    <NavItem><Link to="/bestelluebersicht">Bestellübersicht</Link></NavItem>
    <NavItem><Link to="/hilfe">Hilfe</Link></NavItem>
    <NavItem><Link to="/ueber-uns">Über uns</Link></NavItem>
  </NavMenu>
);

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

export default Navigation;
