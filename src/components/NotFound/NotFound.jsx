import React from 'react';
import {useNavigate} from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const backPage = () => navigate(-1);

  return (
    <section className="not-found">
      <div className="not-found__caption">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">Страница не найдена</p>
      </div>
      <button className="not-found__button button" type="button" onClick={backPage}>Назад</button>
    </section>
  );
}

export default NotFound;
