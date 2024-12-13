import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";

const MainNavigation = () => {
  // Lokal tilstand for å spore om mobil menyen er åpen eller lukket
  const [isOpen, setIsOpen] = useState(false);

  // Henter informasjon om gjeldende rute
  const location = useLocation();

  // Funksjon for åpen/lukket meny
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Funksjon for beholde fargen på den nåværende side
  const isActive = (path: string) => {
    return location.pathname === path ? "text-red-600" : "text-sky-950";
  };

  // Navigasjons linkene
  const navLinks = [
    {
      path: "/thoughts",
      name: "THOUGHTS",
    },
    {
      path: "/shop",
      name: "MERCH",
    },
    {
      path: "/staff",
      name: "STAFF",
    },
    {
      path: "/thoughtsAdmin",
      name: "THOUGHTS ADMIN",
    },
    {
      path: "/merchAdmin",
      name: "MERCH ADMIN",
    },
    {
      path: "/registerMembers",
      name: "STAFF ADMIN",
    },
  ];

  return (
    <>
      <nav className="bg-white mx-8 mb-6">
        <div className=" flex items-center justify-between mb-4 ">
          {/* Logo med en lenke tilbake til hovedsiden */}
          <div className="w-full">
            <Link to="/">
              <img
                className="w-44"
                src="./src/assets/image/trumplogo.png"
                alt="trump logo"
              />
            </Link>
          </div>
          {/* Nav Links */}
          {navLinks.map((link, index) => {
            return (
              <ul
                key={index}
                className="hidden w-full md:flex md:flex-row md:space-x-8 text-xl"
              >
                <li className={`nav-links ${isActive(`${link.path}`)}`}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              </ul>
            );
          })}
        </div>
        {/* Horisontal linje som skiller navigasjonsbaren fra annet innhold */}
        <hr className="border-red-600" />
      </nav>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div
          className="w-screen h-screen top-0 left-0 bg-black/30 fixed md:hidden z-20"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Hamburger Ikonet */}
      <div className="md:hidden p-5 fixed top-0 right-0">
        {!isOpen && (
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center border-2 w-10 h-10 bg-white rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <RxHamburgerMenu />
          </button>
        )}
      </div>

      {/* Mobil Nav Meny */}
      <div
        className={`md:hidden flex flex-col fixed top-0 right-0 h-screen bg-black/60 p-5 transform z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end">
          {/* Lukk Knappen */}
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center border-2 mb-2 w-10 h-10 bg-white rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <IoIosClose />
          </button>
        </div>
        {/* Nav links */}
        {navLinks.map((link, index) => {
          return (
            <ul key={index} className="flex flex-col text-xl space-y-10 mt-5">
              <li>
                <Link to={link.path} className="nav-links text-white">
                  {link.name}
                </Link>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default MainNavigation;
