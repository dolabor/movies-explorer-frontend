import React from 'react';
import {useLocation} from "react-router-dom";

function MoviesCard({movie, isLiked, onCardLike}) {
  const cardLikeButtonClassName = (
    `movies-card__like-button ${isLiked && 'movies-card__like-button_liked'}`
  );
  const location = useLocation();
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const handleLikeClick = () => {
    onCardLike(movie, isLiked);
  };

  const openTrailerLink = () => {
    if (movie.trailerLink) {
      window.open(movie.trailerLink, '_blank');
    }
  };

  return (
    <section className="movies-card">
      <img src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
           alt="Постер фильма"
           className="movies-card__image"
           onClick={openTrailerLink}
      />
      <div className="movies-card__intro">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        {location.pathname === '/saved-movies' ? (
          <button className="button movies-card__delete-button" onClick={handleLikeClick} type="button"></button>
        ) : (
          <button className={`button ${cardLikeButtonClassName}`} onClick={handleLikeClick} type="button"></button>
        )}
      </div>
      <p className="movies-card__duration">{`${hours}ч ${minutes}м`}</p>
    </section>
  );
}

export default MoviesCard;
