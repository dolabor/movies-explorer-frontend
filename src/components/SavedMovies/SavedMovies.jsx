import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({isLoading}) {

  return (
    <div className="movies">
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList />
      )}
    </div>
  );
}

export default SavedMovies;
