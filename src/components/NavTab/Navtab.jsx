import React from "react";
import {NavLink} from "react-router-dom";

function Navtab() {
  return (
    <section className="navtab">
      <NavLink to="/movies" className="navtab__link">
        О проекте
      </NavLink>
      <NavLink to="/movies" className="navtab__link">
        Технологии
      </NavLink>
      <NavLink to="/movies" className="navtab__link">
        Студент
      </NavLink>
    </section>
  );
}

export default Navtab;
