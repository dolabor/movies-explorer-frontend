import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ data, onCardLike, onCardDelete}) {
  const [visibleCards, setVisibleCards] = useState(5);
  const [currentCards, setCurrentCards] = useState([]);
  const [showMoreVisible, setShowMoreVisible] = useState(true);

  useEffect(() => {
    setCurrentCards(data.slice(0, visibleCards));
  }, [data, visibleCards]);

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
    if (window.innerWidth >= 1280) {
      setVisibleCards(12);
    } else if (window.innerWidth >= 768) {
      setVisibleCards(8);
    } else {
      setVisibleCards(5);
    }
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__grid">
        {currentCards.map((movie, cardNumber) => (
          <li key={movie.id} className="movies-card-list__item">
            <MoviesCard
              data={data}
              isLiked={movie.isLiked}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          </li>
        ))}
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
