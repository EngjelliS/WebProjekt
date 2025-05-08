import { Routes, Route } from 'react-router-dom';
import Startseite from '../pages/Startseite';
import Produkte from '../pages/Produkte';
import Warenkorb from '../pages/Warenkorb';
import Bestelluebersicht from '../pages/Bestelluebersicht';
import Hilfe from '../pages/Hilfe'; 
import UeberUns from '../pages/UeberUns';
import Anmeldung from '../pages/Anmeldung';
import Impressum from '../pages/Impressum';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Startseite />} />
      <Route path="/produkte" element={<Produkte />} />
      <Route path="/warenkorb" element={<Warenkorb />} />
      <Route path="/bestelluebersicht" element={<Bestelluebersicht />} />
      <Route path="/hilfe" element={<Hilfe />} />
      <Route path="/ueber-uns" element={<UeberUns />} />
      <Route path="/anmeldung" element={<Anmeldung />} />
      <Route path="/impressum" element={<Impressum />} />
    </Routes>
  );
};

export default AppRouter;