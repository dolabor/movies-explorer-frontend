import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {movieInitialCards} from "../../utils/constants";

function Movies({isLoading}) {

  return (
    <div className="movies">
      <SearchForm/>
      {isLoading ? (
        <Preloader/>
      ) : (
        <MoviesCardList movies={movieInitialCards}/>
      )}
    </div>
  );
}

export default Movies;
