import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import HomePage from "../pages/HomePage";
import GetAllMerchandises from "../components/trumpMerch/GetMerchandises";
import RegisterMember from "../components/staffMembers/RegisterMember";
import StaffmemberList from "../components/staffMembers/StaffMemberList";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<GetAllMerchandises />}></Route>
        <Route path="/registerMembers" element={<RegisterMember />}></Route>
        <Route path="/staff" element={<StaffmemberList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
