import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {movieSavedCards} from "../../utils/constants";

function SavedMovies({isLoading}) {

  return (
    <main className="saved-movies">
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movieSavedCards}/>
      )}
        <div className="saved-movies__divider"></div>
    </main>
  );
}

export default SavedMovies;
