import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav className="bg-white mx-8 mb-6">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Logo with link */}
        <div>
          <Link to="/home">
            <img
              className="w-56 mb-4"
              src="./src/assets/image/trumplogo.png"
              alt="trump logo"
            />
          </Link>
        </div>
        {/* Navigation Menu */}
        <ul className="flex space-x-8 text-xl text-sky-950">
          {/* Makes all navbar items spaced 8px apart using flexbox */}

          <li>
            <Link
              to="/shop"
              className=" hover:text-red-600 transition duration-150"
            >
              SHOP
            </Link>
          </li>

          <li>
            <Link
              to="/staff"
              className=" hover:text-red-600 transition duration-150"
            >
              STAFF
            </Link>
          </li>

          <li>
            <Link
              to="/thoughtsAdmin"
              className=" hover:text-red-600 transition duration-150"
            >
              THOUGHTS ADMIN
            </Link>
          </li>

          <li>
            <Link
              to="/merchAdmin"
              className=" hover:text-red-600 transition duration-150"
            >
              SHOP ADMIN
            </Link>
          </li>

          <li>
            <Link
              to="/registerMembers"
              className=" hover:text-red-600 transition duration-150"
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
