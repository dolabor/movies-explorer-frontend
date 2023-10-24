import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import closeMenuButton from "../../images/close-menu.svg";

function Navigation({isOpen, onClose}) {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    isOpen ? (
      <section className="navigation">
        <button className="navigation__close-button button" onClick={onClose}>
          <img src={closeMenuButton} alt="Кнопка закрытия меню"/>
        </button>
        <div className="navigation__content">
          <div className="navigation__movies-area">
            <NavLink to="/movies" className="navigation__link">
              Главная
            </NavLink>
            <NavLink to="/movies" className="navigation__link">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="navigation__link">
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="navigation__profile">
            <NavLink
              to="/"
              className={`navigation__profile-link ${isActive('/') ? 'navigation__profile-link_active' : ''}`}>
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className={`navigation__profile-link ${isActive('/movies') ? 'navigation__profile-link_active' : ''}`}>
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={`navigation__profile-link ${isActive('/saved-movies') ? 'navigation__profile-link_active' : ''}`}>
              Сохранённые фильмы
            </NavLink>
            <div className="navigation__profile-icon"></div>
          </div>
        </div>
      </section>
    ) : ""
  );
}

export default Navigation;
