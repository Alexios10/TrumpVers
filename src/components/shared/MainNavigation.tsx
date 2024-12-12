import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";

const MainNavigation = () => {
  // Lokal tilstand for å spore om menyen er åpen eller lukket
  const [isOpen, setIsOpen] = useState(false);

  // Henter informasjon om gjeldende rute
  const location = useLocation();

  // Funksjon for å toggle menyens åpen/lukket tilstand
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Funksjon for å sjekke om en rute er aktiv, returnerer en CSS-klasse for å markere aktiv tilstand
  const isActive = (path) => {
    return location.pathname === path ? "text-red-600" : "text-sky-950";
  };

  return (
    <>
      <nav className="bg-white flex shadow-md h-20 items-center">
        {/* Logo med en lenke tilbake til hovedsiden */}
        <Link to="/">
          <img
            className="w-32 ml-3"
            src="./src/assets/image/trumplogo.png"
            alt="trump logo"
          />
        </Link>

        <div className=" flex items-center justify-center ml-20 md:mr-10 xl:mr-0">
          {/* Navigation Meny: Flex-meny for navigasjon */}
          <ul className="hidden md:flex md:flex-row md:space-x-8 text-xl">
            {/* Liste over navigasjonslenker med dynamisk klasse basert på aktiv rute */}
            <li>
              <Link
                to="/thoughts"
                className={`nav-links ${isActive("/thoughts")}`}
              >
                THOUGHTS
              </Link>
            </li>
            <li>
              <Link to="/shop" className={`nav-links ${isActive("/shop")}`}>
                MERCH
              </Link>
            </li>
            <li>
              <Link to="/staff" className={`nav-links ${isActive("/staff")}`}>
                STAFF
              </Link>
            </li>
            <li>
              <Link
                to="/thoughtsAdmin"
                className={`nav-links ${isActive("/thoughtsAdmin")}`}
              >
                THOUGHTS ADMIN
              </Link>
            </li>
            <li>
              <Link
                to="/merchAdmin"
                className={`nav-links ${isActive("/merchAdmin")}`}
              >
                MERCH ADMIN
              </Link>
            </li>
            <li>
              <Link
                to="/registerMembers"
                className={`nav-links ${isActive("/registerMembers")}`}
              >
                STAFF ADMIN
              </Link>
            </li>
          </ul>
        </div>
        {/* Horisontal linje som skiller navigasjonsbaren fra annet innhold */}
        <hr className="border-red-600" />
      </nav>

      {/* Mobil Nav */}
      <div
        className={`${
          isOpen &&
          "w-screen h-screen  top-0 left-0 bg-black/30 fixed md:hidden"
        }`}
      ></div>
      <div className="md:hidden flex flex-col absolute right-0 top-0">
        {/* Viser enten et lukk-ikon eller hamburger-ikon basert på isOpen-tilstanden */}
        {isOpen ? (
          <div className="flex flex-col bg-black/60 p-5">
            <div className="flex justify-end">
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center border-2 mb-2 w-10 h-10 bg-white rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                <IoIosClose />
              </button>
            </div>

            {/* nav links */}
            <ul className="flex flex-col text-xl space-y-10">
              <li className="">
                <Link
                  to="/thoughts"
                  className={`nav-links text-white ${isActive("/thoughts")}`}
                >
                  THOUGHTS
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className={`nav-links text-white ${isActive("/shop")}`}
                >
                  MERCH
                </Link>
              </li>
              <li>
                <Link
                  to="/staff"
                  className={`nav-links text-white ${isActive("/staff")}`}
                >
                  STAFF
                </Link>
              </li>
              <li>
                <Link
                  to="/thoughtsAdmin"
                  className={`nav-links text-white ${isActive(
                    "/thoughtsAdmin"
                  )}`}
                >
                  THOUGHTS ADMIN
                </Link>
              </li>
              <li>
                <Link
                  to="/merchAdmin"
                  className={`nav-links text-white ${isActive("/merchAdmin")}`}
                >
                  MERCH ADMIN
                </Link>
              </li>
              <li>
                <Link
                  to="/registerMembers"
                  className={`nav-links text-white ${isActive(
                    "/registerMembers"
                  )}`}
                >
                  STAFF ADMIN
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="p-5">
            {" "}
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center border-2 w-10 h-10 bg-white rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <RxHamburgerMenu />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MainNavigation;
