import { useState } from "react";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
            className="flex items-center justify-center w-10 h-10 bg-blue-900 text-white rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            {isOpen ? (
              <span className="text-xl">✖</span> 
            ) : (
              <span className="text-xl">☰</span> 
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <ul
          className={`flex-col md:flex md:flex-row md:space-x-8 text-xl text-sky-950 ${
            isOpen ? "flex" : "hidden"
          } md:visible`}
        >
          <li>
            <Link
              to="/thoughts"
              className="hover:text-red-600 transition duration-150"
            >
              THOUGHTS
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="hover:text-red-600 transition duration-150"
            >
              SHOP
            </Link>
          </li>
          <li>
            <Link
              to="/staff"
              className="hover:text-red-600 transition duration-150"
            >
              STAFF
            </Link>
          </li>
          <li>
            <Link
              to="/thoughtsAdmin"
              className="hover:text-red-600 transition duration-150"
            >
              THOUGHTS ADMIN
            </Link>
          </li>
          <li>
            <Link
              to="/merchAdmin"
              className="hover:text-red-600 transition duration-150"
            >
              SHOP ADMIN
            </Link>
          </li>
          <li>
            <Link
              to="/registerMembers"
              className="hover:text-red-600 transition duration-150"
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
