import React from "react";
import {Routes, Route, useRoutes, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";

function App(props) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isSuccessfulSignUp, setIsSuccessfulSignUp] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [likedMovies, setLikedMovies] = React.useState([]);

  const navigate = useNavigate();

  function handleRegister(data) {
    mainApi.register(data)
      .then(() => {
        setIsSuccessfulSignUp(true);
        handleLogin(data);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessfulSignUp(false);
      })
  }

  function tokenCheck() {
    mainApi.checkToken()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          navigate("/", {replace: true});
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
  }

  function handleLogin(data) {
    mainApi.login(data)
      .then(() => {
        setIsLoggedIn(true);
        navigate("/profile");
      })
      .catch((err) => console.log(err))
  }

  function handleLogout() {
    mainApi.logout()
      .then((res) => {
        if (res) {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    mainApi.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }

  function handleLikeClick(selectedCard, isCardLiked) {
    const selectedCardId = selectedCard.id || selectedCard.movieId;

    if (isCardLiked) {
      mainApi
        .deleteFilm(selectedCardId)
        .then(() => {
          setLikedMovies(likedMovies.filter(({id, movieId}) => id !== selectedCardId && movieId !== selectedCardId));
        })
        .catch((err) => console.log(err));
    } else {
      mainApi
        .addNewMovie(selectedCard)
        .then(() => {
          setLikedMovies([...likedMovies, {...selectedCard, movieId: selectedCardId}]);
        })
        .catch((err) => console.error(err));
    }
  }

  let header = useRoutes([
    {path: "/", element: <Header isLoggedIn={isLoggedIn}/>,},
    {path: "/movies", element: <Header isLoggedIn={isLoggedIn}/>},
    {path: "/saved-movies", element: <Header isLoggedIn={isLoggedIn}/>},
    {path: "/profile", element: <Header isLoggedIn={isLoggedIn}/>},
  ]);

  let footer = useRoutes([
    {path: "/", element: <Footer/>,},
    {path: "/movies", element: <Footer/>},
    {path: "/saved-movies", element: <Footer/>},
  ]);

  React.useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserProfile()
        .then((profileData) => {
          setCurrentUser(profileData)
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    setIsLoading(true);

    moviesApi
      .getMoviesList()
      .then((data) => {
        setData(data);
      })
       .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log(isLoading)
      });
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    mainApi
      .getSavedMovies()
      .then((savedMoviesList) => {
        setLikedMovies(savedMoviesList);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {header}
      <Routes>
        <Route
          exact path="/"
          element={<Main/>}
        />
        <Route
          exact path="/movies"
          element={
            <ProtectedRoute
              element={
                <Movies
                  data={data}
                  isLoading={isLoading}
                  likedMovies={likedMovies}
                  onCardLike={handleLikeClick}
                />}
              isLoggedIn={isLoggedIn}
            />}
        />
        <Route
          exact path="/saved-movies"
          element={
            <ProtectedRoute
              element={<SavedMovies
                data={likedMovies}
                isLoading={false}
                likedMovies={likedMovies}
                handleLikeClick={handleLikeClick}
              />}
              isLoggedIn={isLoggedIn}
            />}
        />}
        <Route
          exact path="/signup"
          element={<Register onRegistration={handleRegister}/>}
        />
        <Route
          exact path="/signin"
          element={
            <Login
              onAuthorization={handleLogin}
              onCheckToken={tokenCheck}
            />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={
                <Profile
                  onSubmit={handleUpdateUser}
                  handleLogout={handleLogout}
                />
              }
              isLoggedIn={isLoggedIn}
            />}
        />
        <Route
          path="*"
          element={<NotFound/>}
        />
      </Routes>
      {footer}
    </CurrentUserContext.Provider>
  )
}

export default App;
