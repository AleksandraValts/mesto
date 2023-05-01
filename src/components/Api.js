class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    
    _serverError(res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    }

    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    addNewCard(data) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      //  body: JSON.stringify({ name: data.name, link: data.link }),
      }).then((res) => 
        this._serverError(res)
      );
    }

    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    getCardLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    deleteCardLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    changeAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => {
        return this._serverError(res);
      });
    }

    changeUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
        //body: JSON.stringify({name: data['popup-name'], about: data['popup-text'] }),
      }).then((res) => this._serverError(res)
      );
    }
}

export { Api }

