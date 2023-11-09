import React, {useEffect, useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({data, isLoading, handleLikeClick}) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const storedSearchQuery = localStorage.getItem('searchQuery') || '';
  const [searchQuery, setSearchQuery] = useState(storedSearchQuery);
  const [error, setError] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError('');
  };

  return (
    <main className="saved-movies">
      <SearchForm
        isShortMovie={isShortMovie}
        searchQuery={searchQuery}
        error={error}
        handleSearchChange={handleSearchChange}
        setIsShortMovie={setIsShortMovie}
      />
      {isLoading ? (
        <Preloader/>
      ) : (
        <MoviesCardList data={data} likedMovies={data} isShortMovie={isShortMovie}
                        onCardLike={card => handleLikeClick(card, true)}/>
      )}
      <div className="saved-movies__divider"></div>
    </main>
  );
}

export default SavedMovies;
