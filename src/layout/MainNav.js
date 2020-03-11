import React from "react";

import { NavLink } from "react-router-dom";

import "./MainNav.css";

function MainNav() {
  return (
    <nav className="header__nav">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/3d-configurator">Configurateur 3D</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
