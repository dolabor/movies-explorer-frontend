import React, {useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {moviesApi} from '../../utils/MoviesApi';

function Movies({ isLoading, onCardLike, likedMovies }) {
  const storedSearchQuery = localStorage.getItem('searchQuery') || '';
  const storedIsShortMovie = localStorage.getItem('isShortMovie') === 'true';
  const [searchQuery, setSearchQuery] = useState(storedSearchQuery);
  const [foundMovies, setFoundMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchedOnce, setSearchedOnce] = useState(false);
  const [isCardListVisible, setIsCardListVisible] = useState(true);
  const [isShortMovie, setIsShortMovie] = useState(storedIsShortMovie);

  const handleShortMoviesToggle = () => {
    setIsShortMovie(!isShortMovie);
    localStorage.setItem('isShortMovie', (!isShortMovie).toString());
  }

  const updateCardList = () => {
    moviesApi
      .getMoviesList()
      .then((moviesList) => {
        const filteredMovies = moviesList.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFoundMovies(filteredMovies);
        setSearchedOnce(true);
      })
      .catch(() => {
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      });
  }

  useEffect(() => {
    if (storedSearchQuery) {
      updateCardList();
    }

    setSearchQuery(storedSearchQuery);
    setIsShortMovie(storedIsShortMovie);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchedOnce(true);
    updateCardList();

    if (searchQuery.trim() === '') {
      setError('Нужно ввести ключевое слово');
      setIsCardListVisible(false);
    } else {
      setError('');
      setIsCardListVisible(true);
      localStorage.setItem('searchQuery', searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError('');
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
      {isLoading ? (
        <Preloader/>
      ) : searchedOnce ? (
        foundMovies.length > 0 ? (
          <MoviesCardList
            data={foundMovies}
            likedMovies={likedMovies}
            onCardLike={onCardLike}
            isCardListVisible={isCardListVisible}
            isShortMovie={isShortMovie}
            isShowMoreEnabled={true}
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
