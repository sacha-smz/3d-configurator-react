import React from "react";

import "./Header.scss";
import logo from "./img/vto_logo.svg";

import MainNav from "../MainNav/MainNav.js";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo VTO Virtual Try On FR" className="header__logo" />
      <MainNav className="header__nav" />
    </header>
  );
}

export default Header;
