import React, {useState, useEffect} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies}) {
  const [visibleCards, setVisibleCards] = useState(5);
  const [allCards, setAllCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [showMoreVisible, setShowMoreVisible] = useState(true);

  const maxMovies = currentCards.length + visibleCards;

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCards(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(8);
      } else {
        setVisibleCards(5);
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    setAllCards(movies);
    setCurrentCards(movies.slice(0, visibleCards));
  }, [movies, visibleCards]);

  const handleShowMore = () => {
    const nextRowStart = currentCards.length;
    const nextRowEnd = nextRowStart + visibleCards;
    const nextRow = allCards.slice(nextRowStart, nextRowEnd);

    setCurrentCards([...currentCards, ...nextRow]);

    if (nextRowEnd >= allCards.length) {
      setShowMoreVisible(false);
    }
  };

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__grid">
        {movies.map((movie, cardNumber) => {
          if (cardNumber < maxMovies) {
            return (
              <MoviesCard
                key={movie.id}
                title={movie.title}
                duration={movie.duration}
                poster={movie.image}
                isLiked={movie.isLiked}
              />
            );
          }
        })}
      </div>
      {maxMovies < allCards.length && (
        <button className="movies-card-list__more-button button" onClick={handleShowMore}>
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
