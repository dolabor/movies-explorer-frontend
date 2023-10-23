import React from "react";
import formLogo from "../../images/header-logo.svg";
import {Link} from "react-router-dom";

const FormTemplate = ({formTitle, titleButton, onSubmit, bottomText, redirectRoute, redirectLinkTitle, nameForm}) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    onSubmit({email, password})
  }

  return (
    <div className="form__template">
      <img className="form__logo" src={formLogo} alt="Логотип Movies Explorer"/>
      <form className="form__container" onSubmit={handleSubmitForm}>
        <div className="form__top">
          <h2 className="form__title">{formTitle}</h2>
          <fieldset className="form__inputs">
            {nameForm === 'signup' && (<div className="form__enter">
              <label className="form__input-label" htmlFor="name">Имя</label>
              <input
                className="form__input"
                autoComplete="off"
                id="name"
                name="name"
                type="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
              )}
            <div className="form__enter">
              <label className="form__input-label" htmlFor="email">E-mail</label>
              <input
                className="form__input"
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form__enter">
              <label className="form__input-label" htmlFor="password">Пароль</label>
              <input
                className="form__input"
                autoComplete="off"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </fieldset>
        </div>
        <div className="form__submit">
          <button
            className="form__submit-button button"
            type="submit">
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
    </div>
  )
}
export default FormTemplate;
