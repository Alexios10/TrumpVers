import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import HomePage from "../pages/HomePage";
import UpdateDeleteThoughts from "../components/trumpThoughts/UpdateDeleteThoughts";
import GetAllMerchandises from "../components/trumpMerch/GetMerchandises";
import UpdateDeleteMember from "../components/staffMembers/UpdateDeleteMember";
import RegisterMember from "../components/staffMembers/RegisterMember";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thoughtsAdmin" element={<UpdateDeleteThoughts />}></Route>
        <Route path="/shop" element={<GetAllMerchandises />}></Route>
        <Route path="/membersAdmin" element={<UpdateDeleteMember />}></Route>
        <Route path="/registerMembers" element={<RegisterMember />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
