import React, {useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {shortMoviesDuration} from "../../utils/constants";

function SavedMovies({data, isLoading, handleLikeClick}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);
  const [error, setError] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      setError('Нужно ввести ключевое слово');
      setFoundMovies([]);
    } else {
      setError('');

      const filteredMovies = data.filter(
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
    }
  };

  const handleShortMoviesToggle = () => {
    setIsShortMovie(!isShortMovie);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError('');
  };

  useEffect(() => {
    setFoundMovies([]);
  }, [data]);

  return (
    <main className="saved-movies">
      <SearchForm
        isShortMovie={isShortMovie}
        searchQuery={searchQuery}
        error={error}
        handleSearchChange={handleSearchChange}
        setIsShortMovie={setIsShortMovie}
        handleSearchSubmit={handleSearchSubmit}
        handleShortMoviesToggle={handleShortMoviesToggle}
      />
      {isLoading ? (
        <Preloader/>
      ) : (
        <MoviesCardList
          data={foundMovies}
          likedMovies={data}
          isShortMovie={isShortMovie}
          onCardLike={card => handleLikeClick(card, true)}
          isShowMoreEnabled={false}
          isCardListVisible={true}
        />
      )}
      <div className="saved-movies__divider"></div>
    </main>
  );
}

export default SavedMovies;
