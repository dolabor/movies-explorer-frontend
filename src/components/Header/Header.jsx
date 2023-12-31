import React from "react";
import headerLogo from '../../images/header-logo.svg';
import burgerLogo from '../../images/burger-menu-icon.svg';

import {NavLink, useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({isLoggedIn}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <header className={`header ${location.pathname === '/' ? 'header_blue' : ''}`}>
      <div className="header__content">
        <NavLink to="/" className="header__logo-link">
          <img className="header__logo" src={headerLogo} alt="Логотип Movie Explorer"/>
        </NavLink>
        {isLoggedIn ? (
          <>
            <div className="header__buttons">
              <div className="header__movies-area">
                <NavLink
                  to="/movies"
                  className={`header__movies-link ${isActive('/movies') ? 'header__movies-link_active' : ''}`}
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={`header__movies-link ${isActive('/saved-movies')
                    ? 'header__movies-link header__movies-link_active' : ''}`}
                >
                  Сохраненные фильмы
                </NavLink>
              </div>
              <div className="header__profile">
                <NavLink to="/profile" className="header__link">
                  Аккаунт
                </NavLink>
                <div
                  className={`header__profile-icon ${location.pathname === '/' ? 'header__profile-icon_blue' : ''}`}
                ></div>
              </div>
            </div>
            <button className="header__burger-button button" type="button" onClick={toggleMenu}>
              <img className="header__burger-icon" src={burgerLogo} alt="Логотип Movie Explorer"/>
            </button>
            <Navigation isOpen={isMenuOpen} onClose={closeMenu}/>
          </>
        ) : (
          <div className="header__auth">
            <NavLink to="/signup" className="header__signup">
              Регистрация
            </NavLink>
            <NavLink to="/signin" className="header__login-button button">
              Войти
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
