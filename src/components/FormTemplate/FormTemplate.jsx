import React from "react";
import formLogo from "../../images/header-logo.svg";
import {Link, NavLink} from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";

const FormTemplate = ({formTitle, titleButton, bottomText, redirectRoute, redirectLinkTitle, nameForm}) => {
  const {values, errors, isValid, handleChange} = useFormValidation({});

  return (
    <section className="form__template">
      <NavLink to="/" className="form__logo-link">
        <img className="form__logo" src={formLogo} alt="Логотип Movies Explorer"/>
      </NavLink>
      <form className="form__container">
        <div className="form__top">
          <h1 className="form__title">{formTitle}</h1>
          <fieldset className="form__inputs">
            {nameForm === 'signup' && (
              <div className="form__enter">
                <label className="form__input-label" htmlFor="name">
                  Имя
                </label>
                <input
                  minLength={2}
                  maxLength={30}
                  className="form__input"
                  autoComplete="off"
                  id="name"
                  name="name"
                  type="name"
                  value={values.name || ''}
                  onChange={handleChange}
                  placeholder="Имя"
                  required
                />
                <span
                  className={
                    errors.name
                      ? "form__input-error form__input-error_active"
                      : "form__input-error"
                  }
                >
              Некорректный формат имени пользователя
            </span>
              </div>
            )}
            <div className="form__enter">
              <label className="form__input-label" htmlFor="email">
                E-mail
              </label>
              <input
                className="form__input"
                minLength={2}
                maxLength={30}
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                value={values.email || ''}
                onChange={handleChange}
                required
              />
              <span
                className={
                  errors.email
                    ? "form__input-error form__input-error_active"
                    : "form__input-error"
                }
              >
            Некорректный формат почты
          </span>
            </div>
            <div className="form__enter">
              <label className="form__input-label" htmlFor="password">
                Пароль
              </label>
              <input
                className="form__input"
                minLength={2}
                maxLength={30}
                autoComplete="off"
                id="password"
                name="password"
                type="password"
                value={values.password || ''}
                onChange={handleChange}
                placeholder="Пароль"
                required
              />
              <span
                className={
                  errors.password
                    ? "form__input-error form__input-error_active"
                    : "form__input-error"
                }
              >
            Что-то пошло не так...
          </span>
            </div>
          </fieldset>
        </div>
        <div className="form__submit">
          <button
            className={`form__submit-button button ${!isValid && "form__submit-button_disabled"}`}
            type="submit"
            disabled={!isValid}
          >
            {titleButton}
          </button>
          <div className="form__bottom">
            <p className="form__bottom-text">{bottomText}</p>
            <Link to={redirectRoute} className="form__bottom-link">
              {redirectLinkTitle}
            </Link>
          </div>
        </div>
      </form>
    </section>
  )
}
export default FormTemplate;
