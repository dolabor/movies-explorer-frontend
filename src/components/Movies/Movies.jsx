import React, {useState, useEffect, useCallback} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {moviesApi} from "../../utils/MoviesApi";

function Movies({data, isLoading, onCardLike, likedMovies}) {
  const storedSearchQuery = localStorage.getItem('searchQuery') || '';
  const storedIsShortMovie = localStorage.getItem('isShortMovie') === 'true' || false;

  const [searchQuery, setSearchQuery] = useState(storedSearchQuery);
  const [isShortMovie, setIsShortMovie] = useState(storedIsShortMovie);
  const [foundMovies, setFoundMovies] = useState([]);
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);

  const saveSearchDataToLocalStorage = useCallback((query, isShortMovie, movies) => {
    localStorage.setItem('searchQuery', query);
    localStorage.setItem('isShortMovie', isShortMovie);
    localStorage.setItem('foundMovies', JSON.stringify(movies));
  }, []);

  useEffect(() => {
    const storedFoundMovies = localStorage.getItem('foundMovies');
    if (storedFoundMovies) {
      setFoundMovies(JSON.parse(storedFoundMovies));
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

          saveSearchDataToLocalStorage(searchQuery, isShortMovie, filteredMovies);
        })
        .catch((err) => {
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

  console.log(foundMovies);
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
      ) : foundMovies.length > 0 ? (
        <MoviesCardList
          data={foundMovies}
          likedMovies={likedMovies}
          onCardLike={onCardLike}
          isShortMovie={isShortMovie}
        />
      ) : (
        <p className="movies__error">{error || 'Ничего не найдено'}</p>
      )}
    </main>
  );
}

export default Movies;
