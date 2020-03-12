import React from "react";

import { NavLink } from "react-router-dom";

function MainNav() {
  return (
    <nav className="header__nav">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="current-url">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/3d-configurator" activeClassName="current-url">
            Configurateur 3D
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
