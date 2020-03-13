import React from "react";
import slugify from "slugify";

import { NavLink } from "react-router-dom";

const navLinks = [
  { url: "/", label: "Home", exact: true },
  { url: "/3d-configurator", label: "Configurateur 3D", exact: false }
].map(link => (
  <li key={slugify(link.label)}>
    <NavLink exact={link.exact} to={link.url} activeClassName="current-url">
      {link.label}
    </NavLink>
  </li>
));

function MainNav() {
  return (
    <nav className="header__nav">
      <ul>{navLinks}</ul>
    </nav>
  );
}

export default MainNav;
