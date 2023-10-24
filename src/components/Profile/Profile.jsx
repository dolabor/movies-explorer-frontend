import React from "react";
import {Link} from "react-router-dom";

function Profile({userName, userEmail}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState('John Doe');
  const [email, setEmail] = React.useState('john@example.com');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {userName}!</h2>
      {isEditing ? (
        <div className="profile__top">
          <div className="profile__details">
            <div className="profile__info">
              <p className="profile__text">Имя</p>
              <input className="profile__text profile__input" type="name"
                     value={userName} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="profile__line"></div>
            <div className="profile__info">
              <p className="profile__text">E-mail</p>
              <input className="profile__text profile__input" type="email"
                     value={userEmail} onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>
          <button className="profile__save-button button" type="submit" onClick={handleSaveClick}>Сохранить</button>
        </div>
      ) : (
        <>
          <div className="profile__top">
            <div className="profile__details">
              <div className="profile__info">
                <p className="profile__text">Имя</p>
                <p className="profile__text">{userName}</p>
              </div>
              <div className="profile__line"></div>
              <div className="profile__info">
                <p className="profile__text">E-mail</p>
                <p className="profile__text">{userEmail}</p>
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
