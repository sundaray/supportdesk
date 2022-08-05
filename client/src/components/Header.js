import React from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { LoginIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          <Link to="login">
            <LoginIcon className="loginIcon" />
            Login
          </Link>
        </li>
        <li>
          <Link to="register">
            <UserCircleIcon className="userIcon" />
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
