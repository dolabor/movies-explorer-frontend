import React from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/Navtab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
  return (
    <div className="main">
      <Promo />
      <NavTab />
      <AboutProject id="aboutproject"/>
      <Techs id="techs"/>
      <AboutMe id="aboutme"/>
      <Portfolio />
    </div>
  );
}

export default Main;
