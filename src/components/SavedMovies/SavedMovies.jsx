import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({data, isLoading, handleLikeClick}) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError('');
  };

  return (
    <main className="saved-movies">
      <SearchForm
        searchQuery={searchQuery}
        error={error}
        handleSearchChange={handleSearchChange}
        isShortMovie={isShortMovie}
        setIsShortMovie={setIsShortMovie}
      />
      {isLoading ? (
        <Preloader/>
      ) : (
        <MoviesCardList
          data={data}
          likedMovies={data}
          isShortMovie={isShortMovie}
          onCardLike={card => handleLikeClick(card, true)}
          isCardListVisible={false}
        />
      )}
      <div className="saved-movies__divider"></div>
    </main>
  );
}

export default SavedMovies;
