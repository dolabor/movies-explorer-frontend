import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import {movieInitialCards} from "../../utils/constants";

function MoviesCardList() {

  return (
    <section className="movies-card-list">
      {movieInitialCards.map((movie) => {
        return (
          <MoviesCard
            key={movie.id}
            title={movie.title}
            duration={movie.duration}
            poster={movie.image}
            isLiked={movie.isLiked}
          />
        )
      })}
    </section>
  );
}

export default MoviesCardList;
