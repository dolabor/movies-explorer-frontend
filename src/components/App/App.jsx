import React from "react";
import {Routes, Route} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import {useLocation} from 'react-router-dom';

function App(props) {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [currentUser, setCurrentUser] = React.useState({});

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Header isLoggedIn={true}/>}>
          <Route
            path="/"
            element={<Main/>}
          />
          <Route
            path="/movies"
            element={<Movies/>}
          />
          {/*<Route path="/saved-movies" element={<SavedMovies/>}/>*/}
        </Route>
        <Route
          path="/signup"
          element={<Register/>}
        />
        <Route
          path="/signin"
          element={<Login/>}
        />
        <Route
          path="/profile"
          element={<Profile userName="Виталий" userEmail="pochta@yandex.ru"/>}
        />
        <Route
          path="*"
          element={<NotFound/>}
        />
        <Route
          path="/"
          element={<Footer/>}>
          <Route
            path="/"
            element={<Main/>}
          />
          <Route
            path="/movies"
            element={<Movies/>}
          />
          {/*<Route path="/saved-movies" element={<SavedMovies/>}/>*/}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
