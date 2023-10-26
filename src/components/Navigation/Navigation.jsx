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
      <section>
        <div className="navigation__overlay" onClick={onClose}></div>
        <div className="navigation">
          <button className="navigation__close-button button" type="button" onClick={onClose}>
            <img className="navigation__close-icon" src={closeMenuButton} alt="Кнопка закрытия меню"/>
          </button>
          <div className="navigation__content">
            <div className="navigation__links">
              <NavLink
                to="/"
                className={`navigation__link ${isActive('/') ? 'navigation__link_active' : ''}`}>
                Главная
              </NavLink>
              <NavLink
                to="/movies"
                className={`navigation__link ${isActive('/movies') ? 'navigation__link_active' : ''}`}>
                Фильмы
              </NavLink>
              <NavLink
                to="/saved-movies"
                className={`navigation__link ${isActive('/saved-movies') ? 'navigation__link_active' : ''}`}>
                Сохранённые фильмы
              </NavLink>
            </div>
            <div className="navigation__profile">
              <NavLink to="/profile" className="navigation__profile-link">
                Аккаунт
              </NavLink>
              <div className="navigation__profile-icon"></div>
            </div>
          </div>
        </div>
      </section>
    ) : ""
  );
}

export default Navigation;
