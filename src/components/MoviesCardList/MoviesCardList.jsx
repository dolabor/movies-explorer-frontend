import React, {useState, useEffect} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  addMoreCardsQuantitySize,
  depictedCardsListSizes,
  screenWidthBreakpoints,
  shortMoviesDuration
} from "../../utils/constants";

function MoviesCardList({data, onCardLike, likedMovies, isShortMovie, isCardListVisible}) {
  const [visibleCards, setVisibleCards] = useState(0);
  const [currentCards, setCurrentCards] = useState([]);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [addMoreCards, setAddMoreCards] = useState(0);

  const handleShowMore = () => {
    const nextRowStart = currentCards.length;
    const nextRowEnd = nextRowStart + addMoreCards;
    const nextRow = data.slice(nextRowStart, nextRowEnd);

    setCurrentCards([...currentCards, ...nextRow]);

    console.log("nextRowEnd", nextRowEnd, data.length);

    if (nextRowEnd >= data.length) {
      setShowMoreVisible(false);
    }
  };

  const handleWindowResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= screenWidthBreakpoints.SIZE_XL) {
      setVisibleCards(depictedCardsListSizes.SIZE_L);
      setAddMoreCards(addMoreCardsQuantitySize.SIZE_L);

    } else if (screenWidth >= screenWidthBreakpoints.SIZE_L) {
      setVisibleCards(depictedCardsListSizes.SIZE_M);
      setAddMoreCards(addMoreCardsQuantitySize.SIZE_S);

    } else if (screenWidth >= screenWidthBreakpoints.SIZE_S && screenWidth < screenWidthBreakpoints.SIZE_M) {
      setVisibleCards(depictedCardsListSizes.SIZE_S);
      setAddMoreCards(addMoreCardsQuantitySize.SIZE_S);
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
      setCurrentCards(data.filter(item => item.duration < shortMoviesDuration).slice(0, visibleCards));
    } else {
      setCurrentCards(data.slice(0, visibleCards));
    }
  }, [data, isShortMovie, visibleCards]);

  return (
    <section className="movies-card-list">
      {isCardListVisible ? (
        <>
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
        </>
      ) : ("")}
    </section>
  );
}

export default MoviesCardList;
