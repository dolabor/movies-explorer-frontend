import React from "react";
import {Link} from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";

function Profile() {
  const [isEditing, setIsEditing] = React.useState(false);
  const initialValues = {
    name: "Василий",
    email: "pochta@yandex.ru",
  };
  const {values, handleChange, setValues, errors, isValid} = useFormValidation(initialValues);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  React.useEffect(() => {
    setValues({
      name: "Василий",
      email: "pochta@yandex.ru",
    });
  }, [setValues]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {values.name}!</h2>
      {isEditing ? (
        <div className="profile__top">
          <form className="profile__details" onSubmit={handleSubmitForm}>
            <div className="profile__info">
              <p className="profile__text">Имя</p>
              <input
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
            <Link className="profile__link profile__link_red" to="/signout">Выйти из аккаунта</Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Profile;
