import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Register Thought</li>
        <li>Staff Members</li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
