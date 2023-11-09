import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {useEffect, useState} from "react";

function SavedMovies({data, isLoading, handleLikeClick}) {
  const [isShortMovie, setIsShortMovie] = useState(false);
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
        <Preloader />
      ) : (
        <MoviesCardList data={data} likedMovies={data} isShortMovie={isShortMovie} onCardLike={card => handleLikeClick(card, true)} />
      )}
      <div className="saved-movies__divider"></div>
    </main>
  );
}

export default SavedMovies;
