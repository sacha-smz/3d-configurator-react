import React from "react";

import "./Header.css";
import logo from "../static/img/vto_logo.svg";

import MainNav from "./MainNav.js";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo VTO Virtual Try On FR" className="header__logo" />
      <MainNav />
    </header>
  );
}

export default Header;
