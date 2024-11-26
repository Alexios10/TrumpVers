import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import HomePage from "../pages/HomePage";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="register" element={}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
