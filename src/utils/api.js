class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/profile`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  getMoviesCollection() {
    return fetch(`${this._baseUrl}/`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then(res => this._checkResponse(res));
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "PUT",
      headers: this._headers,
      credentials: 'include',
    }).then(res => this._checkResponse(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.deleteLike(id);
    }
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject('Ошибка');
  }
}

export const api = new Api({
  baseUrl: 'https://api.movies-explorer-EC.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});
