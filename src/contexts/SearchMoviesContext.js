import React from 'react';

export const SearchMoviesContext = React.createContext({
  error: '',
  searching: false,
  searchedOnce: false,
  searchQuery: localStorage.getItem('searchQuery') || '',
  isShortMovie: localStorage.getItem('isShortMovie') === 'true' || false,
});
