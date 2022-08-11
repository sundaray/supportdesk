import React from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { LoginIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectName, logout } from "./authSlice";

const Header = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authStatus");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center w-11/12 md:w-3/5 h-12 sm:h-20 border-b border-gray-500 m-auto mb-10">
      <Link to="/">
        <h1 className="text-xl font-bold">Support Desk</h1>
      </Link>
      <ul className="flex">
        {!name && (
          <Link to="login">
            <li className="mr-4 hover:font-medium">Login</li>
          </Link>
        )}
        {!name && (
          <Link to="register">
            <li className="hover:font-medium">Register</li>
          </Link>
        )}
        {name && (
          <Link to="/">
            <li className="hover:font-medium" onClick={handleLogout}>
              Logout
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Header;
