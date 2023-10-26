import React from "react";
import promoLandingLogo from "../../images/landing-logo.svg";
import NavTab from "../NavTab/Navtab";

function Promo() {
  return (
    <section className="promo">
      <img className="promo__landing-logo" src={promoLandingLogo} alt="Логотип лендинга"/>
      <h1 className="promo__title">Учебный&nbsp;проект студента факультета Веб-разработки.</h1>
      <NavTab/>
    </section>
  );
}

export default Promo;
