class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    
    // проверяем, есть ли ошибка
    _serverError(res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    }

    // получаем данные с сервера
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    // загружаем карточки с сервера
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    // добавляем карточки на страницу
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

    // удаляем карточки
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    // ставим лайк
    getCardLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    // удаляем лайк
    deleteCardLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._serverError(res);
      });
    }

    // меняем аватар
    changeAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => {
        return this._serverError(res);
      });
    }

    // меняем данные с сервера
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

