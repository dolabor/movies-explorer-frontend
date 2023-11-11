import React, {useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({likedMovies, isLoading, handleLikeClick}) {
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

      const filteredMovies = likedMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFoundMovies(filteredMovies);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError('');
  };

  useEffect(() => {
    setFoundMovies([]);
  }, [likedMovies]);

  return (
     <main className="saved-movies">
      <SearchForm
        isShortMovie={isShortMovie}
        searchQuery={searchQuery}
        error={error}
        handleSearchChange={handleSearchChange}
        setIsShortMovie={setIsShortMovie}
        onSearchSubmit={handleSearchSubmit}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          data={foundMovies.length > 0 ? foundMovies : likedMovies}
          likedMovies={likedMovies}
          isShortMovie={isShortMovie}
          onCardLike={card => handleLikeClick(card, true)}
          setShowMoreVisible={false}
          isCardListVisible={true}
        />
      )}
      <div className="saved-movies__divider"></div>
    </main>
  );
}

export default SavedMovies;
