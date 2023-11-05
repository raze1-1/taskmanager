import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#0d0d0e] text-white p-4">
      <div className="container flex justify-between items-center mx-auto">
        <Link to="/" className="text-2xl font-bold">2Do</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/signup" className="hover:text-blue-500">Sign up</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-blue-500">Log in</Link>
          </li>
          <li>
            <Link to="/" className="hover:text-blue-500">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
