import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {useEffect, useState} from "react";

function Movies({ data, isLoading, onCardLike, likedMovies}) {
  const storedSearchQuery = localStorage.getItem('searchQuery') || '';
  const storedIsShortMovie = localStorage.getItem('isShortMovie') === 'true' || false;
  const storedFoundMovies = JSON.parse(localStorage.getItem('foundMovies')) || [];
  const [searchQuery, setSearchQuery] = useState(storedSearchQuery);
  const [isShortMovie, setIsShortMovie] = useState(storedIsShortMovie);
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
    <main className="movies">
      <SearchForm
        isShortMovie={isShortMovie}
        searchQuery={searchQuery}
        error={error}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        setIsShortMovie={setIsShortMovie}
      />
      {/*{isLoading ? (*/}
      {/*  <Preloader/>*/}
      {/*) : (*/}
        <MoviesCardList data={data} likedMovies={likedMovies} onCardLike={onCardLike} isShortMovie={isShortMovie}/>
      {/*)}*/}
    </main>
  );
}

export default Movies;
