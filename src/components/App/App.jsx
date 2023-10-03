import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import React from 'react';
// import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { Routes, Route } from 'react-router-dom';
import Footer from "../Footer/Footer";

function App(props) {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [currentUser, setCurrentUser] = React.useState({});

  return (
    <div>
      <Header />
      <Routes>
        {/*<Route path='/signup'*/}
        {/*       element={<Register onRegistration={handleRegister}/>}>*/}
        {/*</Route>*/}
        {/*<Route path='/signin'*/}
        {/*       element={*/}
        {/*         <Login*/}
        {/*           onAuthorization={handleLogin}*/}
        {/*           onCheckToken={tokenCheck}*/}
        {/*         />}>*/}
        {/*</Route>*/}
        <Route
          path='/'
          element={<Main />}>
        </Route>
        <Route
          path='/movies'
          element={<Movies />}>
        </Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;


