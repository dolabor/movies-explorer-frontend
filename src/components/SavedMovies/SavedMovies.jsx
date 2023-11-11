import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ data, isLoading, handleLikeClick }) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

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
      const filteredMovies = data.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filteredMovies);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies([]);
    }
  }, [searchQuery]);

  return (
    <main className="saved-movies">
      <SearchForm
        isShortMovie={isShortMovie}
        searchQuery={searchQuery}
        error={error}
        handleSearchChange={handleSearchChange}
        setIsShortMovie={setIsShortMovie}
        handleSearchSubmit={handleSearchSubmit}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          data={filteredMovies.length > 0 ? filteredMovies : data}
          likedMovies={data}
          isShortMovie={isShortMovie}
          onCardLike={(card) => handleLikeClick(card, true)}
          showMoreVisible={false}
        />
      )}
      <div className="saved-movies__divider"></div>
    </main>
  );
}

export default SavedMovies;
