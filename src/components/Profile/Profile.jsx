import React from "react";
import {Link} from "react-router-dom";

function Profile({userName, userEmail}) {

  return (
    <section className="profile">
      <div className="profile__data">
        <div className="profile__top">
          <h2 className="profile__title">Привет, {userName}!</h2>
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
          <Link className="profile__link" to="/signin">Редактировать</Link>
          <Link className="profile__link profile__link_red" to="/signout">Выйти из аккаунта</Link>
        </div>
      </div>
    </section>
  );
}

export default Profile;
