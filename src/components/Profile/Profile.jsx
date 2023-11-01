import React from "react";
import {Link} from "react-router-dom";
import {useFormWithValidation} from "../../hooks/useFormValidation";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile({onSubmit, handleLogout}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isProfileEdited, setIsProfileEdited] = React.useState(false);
  const {email, name} = React.useContext(CurrentUserContext);
  const {values, setValues, isValid, handleChange} = useFormWithValidation({});

  const handleEditClick = () => {
    setValues({name, email});
    setIsEditing(!isEditing);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(values);
    setIsEditing(false);
    setIsProfileEdited(true);
    setTimeout(() => setIsProfileEdited(false), 5000);
  };

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {name}!</h1>
      {isEditing ? (
        <form className="profile__top" onSubmit={handleSubmitForm}>
          <div className="profile__details">
            <div className="profile__info">
              <p className="profile__text">Имя</p>
              <input
                minLength={2}
                maxLength={30}
                className="profile__text profile__input"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="profile__line"></div>
            <div className="profile__info">
              <p className="profile__text">E-mail</p>
              <input
                minLength={2}
                maxLength={30}
                className="profile__text profile__input"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="profile__save-button button"
            type="submit"
            onClick={onSubmit}
            disabled={!isValid}>
            Сохранить
          </button>
        </form>
      ) : (
        <>
          <div className="profile__top">
            <div className="profile__details">
              <div className="profile__info">
                <p className="profile__text">Имя</p>
                <p className="profile__text">{name}</p>
              </div>
              <div className="profile__line"></div>
              <div className="profile__info">
                <p className="profile__text">E-mail</p>
                <p className="profile__text">{email}</p>
              </div>
            </div>
          </div>
          {isProfileEdited && (
            <div className="profile__message">
              <p className="profile__success-message">Профиль успешно обновлен!</p>
            </div>
          )}
          <div className="profile__bottom">
            <button className="profile__link button" onClick={handleEditClick}>Редактировать</button>
            <Link className="profile__link profile__link_red" to="/" onClick={handleLogout}>Выйти из аккаунта</Link>
          </div>
        </>
      )}
    </main>
  );
}

export default Profile;
