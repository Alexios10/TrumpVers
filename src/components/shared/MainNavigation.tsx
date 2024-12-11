import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  const isActive = (path) => {
    return location.pathname === path ? "text-red-600" : "text-sky-950"; 
  };

  return (
    <nav className="bg-white mx-8 mb-6">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Logo with link */}
        <div>
          <Link to="/">
            <img
              className="w-56 mb-4"
              src="./src/assets/image/trumplogo.png"
              alt="trump logo"
            />
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 bg-white text-gray-600 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          >
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

        {/* Navigation Menu */}
        <ul
          className={`flex-col md:flex md:flex-row md:space-x-8 text-xl ${
            isOpen ? "flex" : "hidden"
          } md:visible`}
        >
          <li>
            <Link
              to="/thoughts"
              className={`hover:text-red-600 transition duration-150 ${isActive(
                "/thoughts"
              )}`}
            >
              THOUGHTS
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className={`hover:text-red-600 transition duration-150 ${isActive(
                "/shop"
              )}`}
            >
              MERCH
            </Link>
          </li>
          <li>
            <Link
              to="/staff"
              className={`hover:text-red-600 transition duration-150 ${isActive(
                "/staff"
              )}`}
            >
              STAFF
            </Link>
          </li>
          <li>
            <Link
              to="/thoughtsAdmin"
              className={`hover:text-red-600 transition duration-150 ${isActive(
                "/thoughtsAdmin"
              )}`}
            >
              THOUGHTS ADMIN
            </Link>
          </li>
          <li>
            <Link
              to="/merchAdmin"
              className={`hover:text-red-600 transition duration-150 ${isActive(
                "/merchAdmin"
              )}`}
            >
              MERCH ADMIN
            </Link>
          </li>
          <li>
            <Link
              to="/registerMembers"
              className={`hover:text-red-600 transition duration-150 ${isActive(
                "/registerMembers"
              )}`}
            >
              STAFF ADMIN
            </Link>
          </li>
        </ul>
      </div>
      <hr className="border-red-600" />
    </nav>
  );
};

export default MainNavigation;
