import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav className="bg-white p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {" "}
        {/* Justify betwen gjør at det er mellomrom mellom tittelen og resten av navbaren */}
        {/* Tittel */}
        <div>
          <img
            className="w-36 mb-4"
            src="./src/assets/image/trumplogo.png"
            alt="trump logo"
          />
        </div>
        {/* Navigasjonsmeny */}
        <ul className="flex space-x-8">
          {" "}
          {/* Gjør at alle navbar delene kommer 8 px mellom hverandre med flexbox*/}
          <li>
            <Link
              to="/"
              className="text-lg text-sky-950 hover:text-red-600 transition duration-150"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-lg text-sky-950 hover:text-red-600 transition duration-150"
            >
              REGISTER THOUGHTS
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-lg text-sky-950 hover:text-red-600 transition duration-150"
            >
              SHOP
            </Link>
          </li>
          <li>
            <Link
              to="/staff"
              className="text-lg text-sky-950 hover:text-red-600 transition duration-150"
            >
              STAFF
            </Link>
          </li>
          <li>
            <Link
              className=" text-sky-950 hover:text-green-400 transition duration-300"
              to="/thoughtsAdmin"
            >
              ADMINS THOUGHTS
            </Link>
          </li>
        </ul>
      </div>
      <hr className="border-red-600" />
    </nav>
  );
};

export default MainNavigation;
