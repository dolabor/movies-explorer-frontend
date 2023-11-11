import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ data, onCardLike, likedMovies, isShortMovie }) {
  const [visibleCards, setVisibleCards] = useState(0);
  const [currentCards, setCurrentCards] = useState([]);
  const [showMoreVisible, setShowMoreVisible] = useState(true);

  const handleShowMore = () => {
    const nextRowStart = currentCards.length;
    const nextRowEnd = nextRowStart + visibleCards;
    const nextRow = data.slice(nextRowStart, nextRowEnd);

    setCurrentCards([...currentCards, ...nextRow]);

    if (nextRowEnd >= data.length) {
      setShowMoreVisible(false);
    }
  };

 const handleWindowResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      setVisibleCards(4);
    } else if (screenWidth >= 768) {
      setVisibleCards(4);
    } else if (screenWidth >= 320 && screenWidth < 480) {
      setVisibleCards(1);
    } else {
      setVisibleCards(2);
    }
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (isShortMovie) {
      setCurrentCards(data.filter(item => item.duration < 40).slice(0, visibleCards));
    } else {
      setCurrentCards(data.slice(0, visibleCards));
    }
  }, [data, isShortMovie, visibleCards]);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__grid">
        {currentCards.map((movie) => {
          const isLiked = likedMovies.some((movieCard) => {
            return (movieCard.id || movieCard.movieId) === movie.id;
          });

          return (
            <li key={movie.id} className="movies-card-list__item">
              <MoviesCard
                movie={movie}
                onCardLike={onCardLike}
                isLiked={isLiked}
              />
            </li>
          );
        })}
      </ul>

      {visibleCards < data.length && showMoreVisible && (
        <button className="movies-card-list__more-button button" type="button" onClick={handleShowMore}>
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
