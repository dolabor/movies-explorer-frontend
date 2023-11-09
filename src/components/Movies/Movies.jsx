import React, {useState, useEffect, useCallback, useContext} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {moviesApi} from "../../utils/MoviesApi";
import {SearchMoviesContext} from "../../contexts/SearchMoviesContext";

function Movies({isLoading, onCardLike, likedMovies}) {
  const [foundMovies, setFoundMovies] = useState([]);
  const {
    error,
    searching,
    searchedOnce,
    searchQuery,
    isShortMovie,
    setSearchQuery,
    setIsShortMovie,
    setError,
    setSearching,
    setSearchedOnce
  } = useContext(SearchMoviesContext);

  const saveSearchDataToLocalStorage = useCallback((query, isShortMovie, movies) => {
    localStorage.setItem('searchQuery', query);
    localStorage.setItem('isShortMovie', isShortMovie);
    localStorage.setItem('foundMovies', JSON.stringify(movies));
  }, []);

  useEffect(() => {
    const storedFoundMovies = localStorage.getItem('foundMovies');
    if (storedFoundMovies) {
      setFoundMovies(JSON.parse(storedFoundMovies));
      setSearchedOnce(true);
    }
  }, []);

  useEffect(() => {
    if (searchQuery && !searching) {
      setSearching(true);

      moviesApi
        .getMoviesList()
        .then((moviesList) => {
          const filteredMovies = moviesList.filter((movie) =>
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearching(false);
          setFoundMovies(filteredMovies);
          setSearchedOnce(true);

          saveSearchDataToLocalStorage(searchQuery, isShortMovie, filteredMovies);
        })
        .catch(() => {
          setSearching(false);
          setError('Во время запроса произошла ошибка. Попробуйте ещё раз.');
        });
    }
  }, [searchQuery]);

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
    }
  };

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
      {isLoading || searching ? (
        <Preloader/>
      ) : searchedOnce ? (
        foundMovies.length > 0 ? (
          <MoviesCardList
            data={foundMovies}
            likedMovies={likedMovies}
            onCardLike={onCardLike}
            isShortMovie={isShortMovie}
          />
        ) : (
          <p className="movies__status">{error || 'Ничего не найдено'}</p>
        )
      ) : (
        <p className="movies__status">Начните поиск</p>
      )}
    </main>
  );
}

export default Movies;
