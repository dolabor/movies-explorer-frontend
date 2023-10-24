import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {movieSavedCards} from "../../utils/constants";

function SavedMovies({isLoading}) {

  return (
    <div className="movies">
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movieSavedCards}/>
      )}
    </div>
  );
}

export default SavedMovies;
