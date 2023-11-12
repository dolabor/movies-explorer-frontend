import React, {useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {moviesApi} from '../../utils/MoviesApi';

function Movies({isLoading, onCardLike, likedMovies, setIsLoading}) {
  const storedSearchQuery = localStorage.getItem('searchQuery') || '';
  const storedIsShortMovie = localStorage.getItem('isShortMovie') === 'true';
  const [searchQuery, setSearchQuery] = useState(storedSearchQuery);
  const [foundMovies, setFoundMovies] = useState([]);
  const [error, setError] = useState('Начните поиск');
  const [isCardListVisible, setIsCardListVisible] = useState(true);
  const [isShortMovie, setIsShortMovie] = useState(storedIsShortMovie);

  const handleShortMoviesToggle = () => {
    setIsShortMovie(!isShortMovie);
    localStorage.setItem('isShortMovie', (!isShortMovie).toString());
  }

  const updateCardList = () => {
    setIsLoading(true);
    setError('');

    moviesApi
      .getMoviesList()
      .then((moviesList) => {
        const filteredMovies = moviesList.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFoundMovies(filteredMovies);

        if (filteredMovies.length === 0) {
          setError("Ничего не найдено");
        } else {
          setError('');
        }
      })
      .catch(() => {
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsLoading(false);
      })
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
      setIsCardListVisible(false);
    } else {
      updateCardList();
      setIsCardListVisible(true);
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
          isCardListVisible={isCardListVisible}
          isShortMovie={isShortMovie}
          isShowMoreEnabled={true}
        />}
    </main>
  );
}

export default Movies;
