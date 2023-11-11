import React from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onSubmit, handleLogout }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isProfileEdited, setIsProfileEdited] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  const [formValues, setFormValues] = React.useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const { isValid, handleChange } = useFormWithValidation();

  const handleEditClick = () => {
    setFormValues({
      name: currentUser.name,
      email: currentUser.email,
    });
    setIsEditing(!isEditing);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setIsEditing(false);
    setIsProfileEdited(true);
    setTimeout(() => setIsProfileEdited(false), 5000);
  };

  const isFormChanged = () => {
    return (
      formValues.name !== currentUser.name ||
      formValues.email !== currentUser.email
    );
  };

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
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
                value={formValues.name}
                onChange={(e) => {
                  handleChange(e);
                  setFormValues({
                    ...formValues,
                    name: e.target.value,
                  });
                }}
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
                value={formValues.email}
                onChange={(e) => {
                  handleChange(e);
                  setFormValues({
                    ...formValues,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <button
            className={`profile__save-button button ${!isValid && "profile__save-button_disabled"}`}
            type="submit"
            onClick={onSubmit}
            disabled={!isValid || !isFormChanged()}
          >
            Сохранить
          </button>
        </form>
      ) : (
        <>
          <div className="profile__top">
            <div className="profile__details">
              <div className="profile__info">
                <p className="profile__text">Имя</p>
                <p className="profile__text">{currentUser.name}</p>
              </div>
              <div className="profile__line"></div>
              <div className="profile__info">
                <p className="profile__text">E-mail</p>
                <p className="profile__text">{currentUser.email}</p>
              </div>
            </div>
          </div>
          {isProfileEdited && (
            <div className="profile__message">
              <p className="profile__success-message">Профиль успешно обновлен!</p>
            </div>
          )}
          <div className="profile__bottom">
            <button className="profile__link button" onClick={handleEditClick}>
              Редактировать
            </button>
            <Link
              className="profile__link profile__link_red"
              to="/"
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

export default Profile;
