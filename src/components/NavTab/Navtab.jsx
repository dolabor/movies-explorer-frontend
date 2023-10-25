import React from "react";
import {NavLink} from "react-router-dom";

function Navtab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__item">
          <a href="/#aboutproject" className="navtab__link">
            О проекте
          </a>
        </li>
        <li className="navtab__item">
          <a href="/#techs" className="navtab__link">
            Технологии
          </a>
        </li>
        <li className="navtab__item">
          <a href="/#aboutme" className="navtab__link">
            Студент
          </a>
        </li>
      </ul>
    </nav>

  );
}

export default Navtab;
