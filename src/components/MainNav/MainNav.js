import React from "react";
//import "./MainNav.scss";

function MainNav(props) {
  const { className } = props;
  return (
    <nav className={className}>
      <ul>
        <li>
          <a href="#top">Home</a>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
