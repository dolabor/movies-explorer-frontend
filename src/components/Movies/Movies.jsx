import React, {useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {moviesApi} from '../../utils/MoviesApi';
import {shortMoviesDuration} from "../../utils/constants";

function Movies({isLoading, onCardLike, likedMovies, setIsLoading}) {
  const storedSearchQuery = localStorage.getItem('searchQuery') || '';
  const storedIsShortMovie = localStorage.getItem('isShortMovie') === 'true';
  const [searchQuery, setSearchQuery] = useState(storedSearchQuery);
  const [foundMovies, setFoundMovies] = useState([]);
  const [error, setError] = useState('Начните поиск');
  const [isShortMovie, setIsShortMovie] = useState(storedIsShortMovie);

  const updateCardList = (shouldToggleIsLoading = true) => {
    if (shouldToggleIsLoading) {
      setIsLoading(true);
    }
    setError('');

    moviesApi
      .getMoviesList()
      .then((moviesList) => {
        const filteredMovies = moviesList.filter(
          (movie) => {
            return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) &&
              (isShortMovie ? movie.duration >= shortMoviesDuration : true)
          }
        );
        setFoundMovies(filteredMovies);

        if (filteredMovies.length === 0) {
          setError("Ничего не найдено");
        } else {
          setError('');
        }
      })
      .catch((err) => {
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        if (shouldToggleIsLoading) {
          setIsLoading(false);
        }
      })
  }

  const handleShortMoviesToggle = () => {
    setIsShortMovie(!isShortMovie);
    updateCardList(false);
    localStorage.setItem('isShortMovie', (!isShortMovie).toString());
  }

  useEffect(() => {
    if (storedSearchQuery) {
      updateCardList();
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      setError('Нужно ввести ключевое слово');
    } else {
      updateCardList();
      localStorage.setItem('searchQuery', searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className="movies">
      <SearchForm
        searchQuery={searchQuery}
        error={error}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        isShortMovie={isShortMovie}
        handleShortMoviesToggle={handleShortMoviesToggle}
      />
      {isLoading && <Preloader/>}
      {!isLoading && !error && foundMovies.length > 0 &&
        <MoviesCardList
          data={foundMovies}
          likedMovies={likedMovies}
          onCardLike={onCardLike}
          isShortMovie={isShortMovie}
          isShowMoreEnabled={true}
        />}
    </main>
  );
}

export default Movies;
