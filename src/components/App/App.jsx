import React from "react";
import {Routes, Route, useRoutes} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import Navigation from "../Navigation/Navigation";

function App(props) {
  let header = useRoutes([
    {path: "/", element: <Header isLoggedIn={true}/>,},
    {path: "/movies", element: <Header isLoggedIn={true}/>},
    {path: "/saved-movies", element: <Header isLoggedIn={true}/>},
  ]);

  let footer = useRoutes([
    {path: "/", element: <Footer/>,},
    {path: "/movies", element: <Footer/>},
    {path: "/saved-movies", element: <Footer/>},
  ]);

  return (
    <div>
      {header}
      <Routes>
        <Route
          path="/"
          element={<Main/>}
        />
        <Route
          path="/movies"
          element={<Movies isLoading={false}/>}
        />
        <Route path="/saved-movies" element={<SavedMovies isLoading={false}/>}/>
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
      </Routes>
      {footer}
    </div>
  )
}

export default App;
