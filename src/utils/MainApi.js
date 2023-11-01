class MainApi {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
      .then(res => this._checkResponse(res))
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  addNewMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailer: data.trailer,
        thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    })
      .then(res => this._checkResponse(res))
  }

  checkToken = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
      .then(res => this._checkResponse(res))
  };

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(res => this._checkResponse(res));
  };

  logout = () => {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }

  deleteFilm(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/movies/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/movies/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  }

  changeLikeMovieStatus(id, isLiked) {
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

export const mainApi = new MainApi({
  baseUrl: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});
