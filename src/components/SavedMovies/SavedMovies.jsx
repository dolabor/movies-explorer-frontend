import React, {useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import {shortMoviesDuration} from "../../utils/constants";
import {moviesApi} from "../../utils/MoviesApi";

function SavedMovies({data, isLoading, handleLikeClick, setIsLoading}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);
  const [error, setError] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);

  const updateCardList = (shortMoviesState = isShortMovie, shouldToggleIsLoading = true) => {
    if (shouldToggleIsLoading) {
      setIsLoading(true);
    }
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      setError('Нужно ввести ключевое слово');
      setFoundMovies([]);
    } else {
      updateCardList();
    }
  };

  const handleShortMoviesToggle = () => {
    setIsShortMovie(!isShortMovie);
    updateCardList(!isShortMovie, false);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError('');
  };

  useEffect(() => {
    updateCardList();
  }, []);

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
      {isLoading && <Preloader/>}
      {!isLoading && !error && foundMovies.length > 0 &&
        <MoviesCardList
          data={foundMovies}
          likedMovies={data}
          isShortMovie={isShortMovie}
          onCardLike={card => handleLikeClick(card, true)}
          isShowMoreEnabled={false}
          isCardListVisible={true}
        />
      }
      <div className="saved-movies__divider"></div>
    </main>
  );
}

export default SavedMovies;
