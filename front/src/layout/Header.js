import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../static/img/vto_logo.svg";

import MainNav from "./MainNav.js";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Logo VTO Virtual Try On FR" />
      </Link>
      <MainNav />
    </header>
  );
}

export default Header;
