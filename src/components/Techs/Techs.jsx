import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

function Techs({id}) {
  return (
    <section className="techs" id={id}>
      <div className="techs__content">
        <SectionTitle title="Технологии"/>
      <div className="techs__description">
        <h3 className="techs__heading">7 технологий</h3>
        <p className="techs__caption">На&nbsp;курсе&nbsp;веб-разработки мы&nbsp;освоили&nbsp;технологии,
          которые&nbsp;применили в дипломном проекте.</p>
      </div>
      <ul className="techs__list">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
      </div>
    </section>
  );
}

export default Techs;
