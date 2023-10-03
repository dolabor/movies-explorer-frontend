import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  // const [isLoading, setLoading] = useState(false);

  return (
    <div className="movies">
      <SearchForm />
      {/*<FilterCheckbox />*/}
      {/*<Preloader />*/}
      {/*<MoviesCardList />*/}
    </div>
  );
}

export default Movies;
