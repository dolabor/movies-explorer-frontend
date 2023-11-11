import React, {useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {moviesApi} from '../../utils/MoviesApi';

function Movies({isLoading, onCardLike, likedMovies}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchedOnce, setSearchedOnce] = useState(false);
  const [isCardListVisible, setIsCardListVisible] = useState(true);
  const [isShortMovie, setIsShortMovie] = useState(false);

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem('searchQuery') || '';
    const storedIsShortMovie = localStorage.getItem('isShortMovie') === 'true';
    const storedFoundMovies = JSON.parse(localStorage.getItem('foundMovies')) || [];

    setSearchQuery(storedSearchQuery);
    setIsShortMovie(storedIsShortMovie);

    if (storedFoundMovies.length > 0) {
      setFoundMovies(storedFoundMovies);
    }
  }, []);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchedOnce(true);
    setIsFormSubmitted(true);

    if (searchQuery.trim() === '') {
      setError('Нужно ввести ключевое слово');
      setIsCardListVisible(false);
    } else {
      setError('');
      setIsCardListVisible(true);
      localStorage.setItem('searchQuery', searchQuery);
      localStorage.setItem('isShortMovie', isShortMovie.toString());
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError('');
  };

  useEffect(() => {
    if (searchQuery && isFormSubmitted && !searching) {
      setSearching(true);

      moviesApi
        .getMoviesList()
        .then((moviesList) => {
          const filteredMovies = moviesList.filter(
            (movie) =>
              movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearching(false);
          setFoundMovies(filteredMovies);
          setSearchedOnce(true);

          localStorage.setItem('foundMovies', JSON.stringify(filteredMovies));
        })
        .catch(() => {
          setSearching(false);
          setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        });
    }
  }, [searchQuery, isFormSubmitted]);

  console.log(isFormSubmitted, searchedOnce)

  return (
    <main className="movies">
      <SearchForm
        searchQuery={searchQuery}
        error={error}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        isShortMovie={isShortMovie}
        setIsShortMovie={setIsShortMovie}
      />
      {isLoading || searching ? (
        <Preloader/>
      ) : searchedOnce && isFormSubmitted ? (
        foundMovies.length > 0 ? (
          <MoviesCardList
            data={foundMovies}
            likedMovies={likedMovies}
            onCardLike={onCardLike}
            isCardListVisible={isCardListVisible}
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
