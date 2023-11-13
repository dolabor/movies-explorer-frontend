class MoviesApi {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    this._moviesListPromise = null;
  }

  getMoviesList() {
    return new Promise((resolve, reject) => {
      if (!this._moviesListPromise) {
        this._moviesListPromise = fetch(`${this._baseUrl}/beatfilm-movies`, {
          headers: this._headers
        })
          .then(res => this._checkResponse(res));
      }
      return this._moviesListPromise
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    })
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject('Ошибка')
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

