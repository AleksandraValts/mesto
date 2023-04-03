const initialCards = [
    {
      name: 'Пожары',
      link: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/36004940-5a77-4164-9d96-01b7d1edb283/orig'
    },
    {
      name: 'Пленницы',
      link: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/0b4affff-b79e-4a91-9a34-1c12ae585b28/orig'
    },
    {
      name: 'Убийца',
      link: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/a978e5ec-76a1-45cf-a72f-f2c6c461d5e9/orig'
    },
    {
      name: 'Прибытие',
      link: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/22905d98-de68-4886-a6d2-4d0f54cae9f4/orig'
    },
    {
      name: 'Бегущий по лезвию 2049',
      link: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/a2e267dd-8504-44bd-b641-d5f2571b4d99/orig'
    },
    {
      name: 'Дюна',
      link: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/917ec2c3-b560-444e-afc9-666c2330a9ae/orig'
    }
  ]; 

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  };

export {config, initialCards}