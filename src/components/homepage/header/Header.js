import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="outer">


    <nav>
      <div className="logo">
        <span>
          <NavLink to="/">Downtime</NavLink>
        </span>
      </div>
      <div className="menu">
        <span>
          <NavLink to="/auth">
            <span>DashBoard</span>
          </NavLink>
        </span>
      </div>
    </nav>
    </div>
  );
};

export default Header;
