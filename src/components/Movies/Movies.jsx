import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({data, isLoading, onCardLike, onCardDelete}) {

  return (
    <main className="movies">
      <SearchForm/>
      {isLoading ? (
        <Preloader/>
      ) : (
        <MoviesCardList onCardLike={onCardLike} onCardDelete={onCardDelete} data={data}/>
      )}
    </main>
  );
}

export default Movies;
