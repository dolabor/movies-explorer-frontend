import React from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({handleSearchSubmit, searchQuery, handleSearchChange, isShortMovie, setIsShortMovie, error}) {
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
