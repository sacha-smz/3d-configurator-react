import React from "react";
import "./MainNav.css";

function MainNav() {
  return (
    <nav className="header__nav">
      <ul>
        <li>
          <a href="#top">Home</a>
        </li>
        <li>
          <a href="#top">Admin</a>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
