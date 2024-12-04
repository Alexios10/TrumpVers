import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import HomePage from "../pages/HomePage";
import GetAllMerchandises from "../components/trumpMerch/GetMerchandises";
import RegisterMember from "../components/staffMembers/RegisterMember";
<<<<<<< HEAD
import StaffmemberList from "../components/staffMembers/StaffMemberList";
import UpdateDeleteMerch from "../components/trumpMerch/UpdateDeleteMerch";
=======
import Staff from "../components/staffMembers/Staff";
>>>>>>> 4c7e5198ea6310425418f409292fd324478e7f55

const AppRouting = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<GetAllMerchandises />}></Route>
        <Route path="/registerMembers" element={<RegisterMember />}></Route>
<<<<<<< HEAD
        <Route path="/staff" element={<StaffmemberList />}></Route>
        <Route path="/merchAdmin" element={<UpdateDeleteMerch />}></Route>
=======
        <Route path="/staff" element={<Staff />}></Route>
>>>>>>> 4c7e5198ea6310425418f409292fd324478e7f55
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
