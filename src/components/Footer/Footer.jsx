import React from "react";

function Footer() {
  return (
    <section className="footer">
      <h2 className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__credentials">
        <p className="footer__copyright">&copy; 2023</p>
        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/"
             target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/"
             target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
