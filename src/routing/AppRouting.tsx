import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavigation from "../components/shared/MainNavigation";
import HomePage from "../pages/HomePage";
import UpdateDeleteThoughts from "../components/trumpThoughts/UpdateDeleteThoughts";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thoughtsAdmin" element={<UpdateDeleteThoughts />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
