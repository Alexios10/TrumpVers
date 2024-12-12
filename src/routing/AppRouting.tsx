// Importerer nødvendige moduler fra React Router og komponenter som brukes i appen
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import HomePage from "../pages/HomePage";
import Merchandises from "../components/trumpMerch/Merchandises";
import RegisterMember from "../components/staffMembers/RegisterMember";
import RegisterMerch from "../components/trumpMerch/RegisterMerch";
import RegisterThought from "../components/trumpThoughts/RegisterThought";
import Staff from "../components/staffMembers/Staff";
import Thoughts from "../components/trumpThoughts/Thoughts";

// AppRouting-komponenten styrer navigasjon og ruteoppsett
const AppRouting = () => {
  return (
    // BrowserRouter gir kontekst for navigasjon i appen
    <BrowserRouter>
      {/* Felles navigasjonsmeny som vises på alle sider */}
      <MainNavigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Merchandises />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/registerMembers" element={<RegisterMember />} />
        <Route path="/merchAdmin" element={<RegisterMerch />} />
        <Route path="/thoughtsAdmin" element={<RegisterThought />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
