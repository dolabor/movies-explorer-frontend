import React, {useState, useEffect} from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({onSearch}) {
  const storedSearchQuery = localStorage.getItem('searchQuery') || '';
  const storedIsShortMovie = localStorage.getItem('isShortMovie') === 'true' || false;
  const storedFoundMovies = JSON.parse(localStorage.getItem('foundMovies')) || [];

  const [searchQuery, setSearchQuery] = useState(storedSearchQuery);
  const [isShortMovie, setIsShortMovie] = useState(storedIsShortMovie);
  const [foundMovies, setFoundMovies] = useState(storedFoundMovies);
  const [error, setError] = useState('');

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
      localStorage.setItem('searchQuery', searchQuery);
      localStorage.setItem('isShortMovie', isShortMovie);
      localStorage.removeItem('foundMovies', foundMovies);

      onSearch(searchQuery, isShortMovie)
        .then((foundMovies) => {
          setFoundMovies(foundMovies);

          localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
        })
        .catch(error)
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('searchQuery');
      localStorage.removeItem('isShortMovie');
      localStorage.removeItem('foundMovies');
    };
  }, []);

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-form__button button"></button>
      </div>
      <FilterCheckbox value={isShortMovie} onChange={() => setIsShortMovie(!isShortMovie)}/>
      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
}

export default SearchForm;
