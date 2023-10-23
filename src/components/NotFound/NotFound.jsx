import React from 'react';
import {Link} from "react-router-dom";

function NotFound() {

  return (
    <div className="not-found">
      <div className="not-found__caption">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__description">Страница не найдена</p>
      </div>
      <Link to="/" className="not-found__link">Назад</Link>
    </div>
  );
}

export default NotFound;
