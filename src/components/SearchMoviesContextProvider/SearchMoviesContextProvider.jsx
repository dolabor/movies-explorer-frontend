import {useState} from "react";
import {SearchMoviesContext} from "../../contexts/SearchMoviesContext";


export function SearchMoviesContextProvider({children}) {
  const storedSearchQuery = localStorage.getItem('searchQuery') || '';
  const storedIsShortMovie = localStorage.getItem('isShortMovie') === 'true' || false;
  const [searchQuery, setSearchQuery] = useState(storedSearchQuery);
  const [isShortMovie, setIsShortMovie] = useState(storedIsShortMovie);
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchedOnce, setSearchedOnce] = useState(false);

  return <SearchMoviesContext.Provider
    value={{
      searchQuery,
      isShortMovie,
      error,
      searching,
      searchedOnce,
      setSearchQuery,
      setIsShortMovie,
      setError,
      setSearching,
      setSearchedOnce
    }}>
    {children}
  </SearchMoviesContext.Provider>

}
