import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import HomePage from "../pages/HomePage";
import GetAllMerchandises from "../components/trumpMerch/GetMerchandises";
import RegisterMember from "../components/staffMembers/RegisterMember";
import StaffmemberList from "../components/staffMembers/StaffMemberList";
import UpdateDeleteMerch from "../components/trumpMerch/UpdateDeleteMerch";
import Staff from "../components/staffMembers/Staff";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<GetAllMerchandises />}></Route>
        <Route path="/registerMembers" element={<RegisterMember />}></Route>
        <Route path="/staff" element={<StaffmemberList />}></Route>
        <Route path="/merchAdmin" element={<UpdateDeleteMerch />}></Route>
        <Route path="/staff" element={<Staff />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
