import React from "react";
import {Link} from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";

function Profile() {
  const [isEditing, setIsEditing] = React.useState(false);
  const initialValues = {
    name: "Виталий",
    email: "pochta@yandex.ru",
    password: ""
  };

  const {values, handleChange, errors, isValid} = useFormValidation(initialValues);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {values.name}!</h1>
      {isEditing ? (
        <div className="profile__top">
          <form className="profile__details" onSubmit={handleSubmitForm}>
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
          </form>
          <button className="profile__save-button button" type="submit">Сохранить</button>
        </div>
      ) : (
        <>
          <div className="profile__top">
            <div className="profile__details">
              <div className="profile__info">
                <p className="profile__text">Имя</p>
                <p className="profile__text">{values.name}</p>
              </div>
              <div className="profile__line"></div>
              <div className="profile__info">
                <p className="profile__text">E-mail</p>
                <p className="profile__text">{values.email}</p>
              </div>
            </div>
          </div>
          <div className="profile__bottom">
            <button className="profile__link button" onClick={handleEditClick}>Редактировать</button>
            <Link className="profile__link profile__link_red" to="/">Выйти из аккаунта</Link>
          </div>
        </>
      )}
    </main>
  );
}

export default Profile;
