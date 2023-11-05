import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="text-white">2Do</div>
      <div className="text-white">
        <ul className="flex flex-row-reverse">
          <li className="px-2">
            <Link to="/">Sign up</Link>
          </li>
          <li className="px-2">
            <Link to="/login">Log in</Link>
          </li>
          <li className="px-2">
            <Link to="/signup">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
