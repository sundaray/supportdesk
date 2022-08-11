import React from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { LoginIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectName } from "./authSlice";

const Header = () => {
  const name = useSelector(selectName);
  return (
    <nav>
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
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
          <li>
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
