import React from 'react';
import {useLocation} from "react-router-dom";

function MoviesCard({data, isLiked, onCardLike, onCardDelete}) {
  const cardLikeButtonClassName = (
    `movies-card__like-button ${isLiked && 'movies-card__like-button_liked'}`
  );
  const location = useLocation();

  const hours = Math.floor(data.duration / 60);
  const minutes = data.duration % 60;

  function handleLikeClick(evt) {
    onCardLike(data);
  }

  function handleDeleteClick(evt) {
    onCardDelete(data);
  }

  return (
    <section className="movies-card">
      <img src={location.pathname ==='/movies' ? `https://api.nomoreparties.co${data.image.url}`: data.image}
           alt="Постер фильма" className="movies-card__image"/>
      <div className="movies-card__intro">
        <h2 className="movies-card__title">{data.title}</h2>
        {location.pathname === '/saved-movies' ? (
          <button className="button movies-card__delete-button" onClick={handleDeleteClick} type="button"></button>
        ) : (
          <button className={`button ${cardLikeButtonClassName}`} onClick={handleLikeClick} type="button"></button>
        )}
      </div>
      <p className="movies-card__duration">{`${hours}ч ${minutes}м`}</p>
    </section>
  );
}

export default MoviesCard;
