import React from "react";
import AboutMePhoto from '../../images/about-me-photo.jpg';
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutMe({id}) {
  return (
    <section className="about-me" id={id}>
      <SectionTitle title="Студент"/>
      <div className="about-me__info">
        <div className="about-me__description">
          <div className="about-me__text">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__details">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__intro">Я родился и живу в Саратове, закончил факультет экономики СГУ.
              У меня есть жена и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
              С&nbsp;2015 года работал в компании «СКБ Контур». После того, как&nbsp;прошёл курс по веб-разработке,
              начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          </div>
          <a className="about-me__link" target="_blank" href="https://github.com/dolabor">Github</a>
        </div>
        <img className="about-me__photo" src={AboutMePhoto} alt="Мое фото"/>
      </div>
    </section>
  );
}

export default AboutMe;
