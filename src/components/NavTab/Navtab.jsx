import React from "react";
import {NavLink} from "react-router-dom";

function Navtab() {
  return (
    <nav className="navtab">
      <a href="/#aboutproject" className="navtab__link">
        О проекте
      </a>
      <a href="/#techs" className="navtab__link">
        Технологии
      </a>
      <a href="/#aboutme" className="navtab__link">
        Студент
      </a>
    </nav>
  );
}

export default Navtab;
