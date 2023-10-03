import React, { useState } from 'react';

function SearchForm({ onSearch }) {
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
      <input
        type="text"
        className="search-form__input"
        placeholder="Фильм"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button type="submit" className="search-form__button"></button>
    </form>
  );
}

export default SearchForm;
