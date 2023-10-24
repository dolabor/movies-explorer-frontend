import React from 'react';
import {useLocation} from "react-router-dom";

function MoviesCard({title, duration, poster, isLiked}) {
  const cardLikeButtonClassName = (
    `movies-card__like-button ${isLiked && 'movies-card__like-button_liked'}`
  );
  const location = useLocation();

  return (
    <div className="movies-card">
      <img src={poster} alt="Постер фильма" className="movies-card__image"/>
      <div className="movies-card__intro">
        <h2 className="movies-card__title">{title}</h2>

        {location.pathname === '/saved-movies' ? (
          <button className="button movies-card__delete-button"></button>
        ) : (
          <button className={`button ${cardLikeButtonClassName}`}></button>
        )}
      </div>
      <p className="movies-card__duration">{duration}</p>
    </div>
  );
}

export default MoviesCard;
