import React, {useState} from 'react';

function SearchForm({onSearch}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          value={searchQuery}
          onChange={handleSearchChange}>
        </input>
        <button type="submit" className="search-form__button button"></button>
      </div>
      <div className="search-form__checkbox-area">
        <label className="search-form__switch">
          <input className="search-form__checkbox" />
            <span className="search-form__slider"></span>
        </label>
        <p className="search-form__checkbox-caption">Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
