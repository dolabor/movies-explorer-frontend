import React, {useState} from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

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
      <FilterCheckbox/>
    </form>
  );
}

export default SearchForm;
