import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutProject() {
  return (
    <section className="about-project">
      <SectionTitle title="О проекте"/>
      <div className="about-project__description">
        <div className="about-project__summary">
          <h3 className="about-project__label">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__detail">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__summary">
          <h3 className="about-project__label">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__detail">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__backend-stage">
          <div className="about-project__backend-scale">1 неделя</div>
          <p className="about-project__caption">Back-end</p>
        </div>
        <div className="about-project__frontend-stage">
          <div className="about-project__frontend-scale">4 недели</div>
          <p className="about-project__caption">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
