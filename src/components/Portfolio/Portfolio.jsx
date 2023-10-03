import React from "react";
import portfolioArrow from "../../images/portfolio-arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/dolabor/russian-travel.git"
             target="_blank" rel="noreferrer">
            <p className="portfolio__item-text">Статичный сайт</p>
            <img className="portfolio__icon" src={portfolioArrow} alt="Иконка стрелки"/>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/dolabor/how-to-learn.git"
             target="_blank" rel="noreferrer">
            <p className="portfolio__item-text">Адаптивный сайт</p>
            <img className="portfolio__icon" src={portfolioArrow} alt="Иконка стрелки"/>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/dolabor/react-mesto-api-full-gha.git"
             target="_blank" rel="noreferrer">
            <p className="portfolio__item-text">Одностраничное приложение</p>
            <img className="portfolio__icon" src={portfolioArrow} alt="Иконка стрелки"/>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
