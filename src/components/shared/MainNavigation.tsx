import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav className="bg-white mx-8 mb-6">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {" "}
        {/* Justify betwen gjør at det er mellomrom mellom tittelen og resten av navbaren */}
        {/* Tittel */}
        <div>
          <img
            className="w-56 mb-4"
            src="./src/assets/image/trumplogo.png"
            alt="trump logo"
          />
        </div>
        {/* Navigasjonsmeny */}
        <ul className="flex space-x-8 text-xl text-sky-950">
          {/* Gjør at alle navbar delene kommer 8 px mellom hverandre med flexbox*/}
          <li>
            <Link
              to="/"
              className=" hover:text-red-600 transition duration-150"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className=" hover:text-red-600 transition duration-150"
            >
              SHOP
            </Link>
          </li>{" "}
          <li>
            <Link
              to="/merchAdmin"
              className=" hover:text-red-600 transition duration-150"
            >
              MERCHADMIN
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
              to="/registerMembers"
              className=" hover:text-red-600 transition duration-150"
            >
              REGISTER NEW MEMBERS
            </Link>
          </li>
        </ul>
      </div>
      <hr className="border-red-600" />
    </nav>
  );
};

export default MainNavigation;
