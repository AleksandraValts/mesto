const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
};

const apiData = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'bc035afe-e6e9-4411-8d64-eb9b90455e25',
    'content-type': 'application/json'
  },
};

export { config, apiData }