import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {useEffect, useState} from "react";

function SavedMovies({data, isLoading, handleLikeClick}) {
  const [visibleCards, setVisibleCards] = useState(5);
  const [currentCards, setCurrentCards] = useState([]);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [isShortMovie, setIsShortMovie] = useState(false);

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
    if (isShortMovie) {
      setCurrentCards(data.filter(item => item.duration < 40).slice(0, visibleCards));
    } else {
      setCurrentCards(data.slice(0, visibleCards));
    }
  }, [data, isShortMovie, visibleCards]);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const storedSearchQuery = localStorage.getItem('searchQuery') || '';
  const storedIsShortMovie = localStorage.getItem('isShortMovie') === 'true' || false;
  const storedFoundMovies = JSON.parse(localStorage.getItem('foundMovies')) || [];
  const [searchQuery, setSearchQuery] = useState(storedSearchQuery);
  const [foundMovies, setFoundMovies] = useState(storedFoundMovies);
  const [error, setError] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      localStorage.setItem('searchQuery', searchQuery);
      localStorage.setItem('isShortMovie', isShortMovie);
      localStorage.removeItem('foundMovies', foundMovies);
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('searchQuery');
      localStorage.removeItem('isShortMovie');
      localStorage.removeItem('foundMovies');
    };
  }, []);

  return (
    <main className="saved-movies">
      <SearchForm
        isShortMovie={isShortMovie}
        searchQuery={searchQuery}
        error={error}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        setIsShortMovie={setIsShortMovie}
      />
      {isLoading ? (
        <Preloader/>
      ) : (
        <MoviesCardList data={data} likedMovies={data} isShortMovie={isShortMovie} onCardLike={card => handleLikeClick(card, true)} />
      )}
      <div className="saved-movies__divider"></div>
    </main>
  );
}

export default SavedMovies;
