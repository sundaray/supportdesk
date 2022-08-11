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
    <nav className="w-11/12 md:w-3/5 flex border-b border-gray-500 m-auto mb-10">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul className="flex">
        {!name && (
          <li>
            <Link to="login">
              <LoginIcon className="loginIcon" />
              Login
            </Link>
          </li>
        )}
        {!name && (
          <li>
            <Link to="register">
              <UserCircleIcon className="userIcon" />
              Register
            </Link>
          </li>
        )}
        {name && (
          <li onClick={handleLogout}>
            <Link to="/">
              <LogoutIcon className="logoutIcon" />
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
