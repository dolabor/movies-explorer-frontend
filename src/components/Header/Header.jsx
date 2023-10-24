import React from "react";
import headerLogo from '../../images/header-logo.svg';
import {NavLink, useLocation} from "react-router-dom";

function Header({isLoggedIn}) {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`header ${location.pathname === '/' ? 'header header_blue' : ''}`}>
      <NavLink to="/" className="header__logo-link">
        <img className="header__logo" src={headerLogo} alt="Логотип Movie Explorer"/>
      </NavLink>
      {isLoggedIn ? (
        <div className="header__buttons">
          <div className="header__movies-area">
            <NavLink to="/movies" className="header__movies-link">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="header__movies-link">
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__profile">
            <NavLink to="/profile" className="header__link">
              Аккаунт
            </NavLink>
            <div className="header__profile-icon"></div>
          </div>
        </div>
      ) : (
        <div className="header__auth">
          {location.pathname === '/signin' && (
            <NavLink to="/signup" className="header__link">
              Регистрация
            </NavLink>
          )}
          {location.pathname === '/signup' && (
            <NavLink to="/signin" className="header__login-button button">
              Войти
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
