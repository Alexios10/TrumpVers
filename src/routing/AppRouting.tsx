import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import HomePage from "../pages/HomePage";
import GetAllMerchandises from "../components/trumpMerch/GetMerchandises";
import RegisterMember from "../components/staffMembers/RegisterMember";
import StaffmemberList from "../components/staffMembers/StaffMemberList";
import RegisterMerch from "../components/trumpMerch/RegisterMerch";

import RegisterThought from "../components/trumpThoughts/RegisterThought";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/shop" element={<GetAllMerchandises />} />
        <Route path="/registerMembers" element={<RegisterMember />} />
        <Route path="/staff" element={<StaffmemberList />} />
        <Route path="/merchAdmin" element={<RegisterMerch />} />
        <Route path="/thoughtsAdmin" element={<RegisterThought />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
