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
    <nav className="bg-white mx-8 mb-6">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Logo med en lenke tilbake til hovedsiden */}
        <div>
          <Link to="/">
            <img
              className="w-56 mb-4"
              src="./src/assets/image/trumplogo.png"
              alt="trump logo"
            />
          </Link>
        </div>

        {/* Hamburger Meny: Vises kun på mindre skjermer (md:hidden) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 bg-white text-gray-600 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            {/* Viser enten et lukk-ikon eller hamburger-ikon basert på isOpen-tilstanden */}
            {isOpen ? (
              <span className="text-xl">
                <IoIosClose />
              </span>
            ) : (
              <span className="text-xl">
                <RxHamburgerMenu />
              </span>
            )}
          </button>
        </div>

        {/* Navigation Meny: Flex-meny for navigasjon */}
        <ul
          className={`flex-col md:flex md:flex-row md:space-x-8 text-xl ${
            isOpen ? "flex" : "hidden"
          } md:visible`}
        >
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
  );
};

export default MainNavigation;
