import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {" "}
        {/* Justify betwen gjør at det er mellomrom mellom tittelen og resten av navbaren */}
        {/* Tittel */}
        <div className="text-white font-semibold text-2xl">
          {" "}
          {/* 2 xl gjør teksten dobbelt så stor */}
          <Link to="/">Trump Things?</Link>
        </div>
        {/* Navigasjonsmeny */}
        <ul className="flex space-x-8">
          {" "}
          {/* Gjør at alle navbar delene kommer 8 px mellom hverandre med flexbox*/}
          <li>
            <Link
              to="/"
              className="text-white hover:text-green-400 transition duration-300"
            >
              Register Thought
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-white hover:text-green-400 transition duration-300"
            >
              Merch Shop
            </Link>
          </li>
          <li>
            <Link
              to="/staff"
              className="text-white hover:text-green-400 transition duration-300"
            >
              Staff Members
            </Link>
          </li>
          <li>
            <Link
              className="text-white hover:text-green-400 transition duration-300"
              to="/thoughtsAdmin"
            >
              Thoughts Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
