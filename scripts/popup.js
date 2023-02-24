// Попап редактирования профиля
let popupProfile = document.querySelector('.popup_type_profile');
let editButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.popup__icon');
let popupSave = document.querySelector('.popup__button');

editButton.addEventListener('click', openModalWindow);
closeButton.addEventListener('click', closeModalWindow);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');

function openModalWindow() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    popupProfile.classList.add('popup_opened');
}

function closeModalWindow() {
    popupProfile.classList.remove('popup_opened');
    popupPhoto.classList.remove('popup_opened');
    popupPlace.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closeModalWindow();
}
formElement.addEventListener('submit', handleFormSubmit);

// Попап добавления новых картинок (мест)
let popupPlace = document.querySelector('.popup_type_places');
let addButton = document.querySelector('.profile__button-add');
let closeAddButton = document.querySelector('.popup__icon_places');
let popupAddSave = document.querySelector('.popup__button_places');

addButton.addEventListener('click', openPlaceWindow);
closeAddButton.addEventListener('click', closeModalWindow);

let formPlacesElement = document.querySelector('.popup__form_places');
let placeInput = document.querySelector('.popup__input_type_place');
let srcInput = document.querySelector('.popup__input_type_src');

function openPlaceWindow() {
    popupPlace.classList.add('popup_opened');
}

function handleFormSubmitPhoto (evt) {
    evt.preventDefault(); 
    renderCard(placeInput.value, srcInput.value);
    closeModalWindow(popupPlace);
    evt.target.reset();
}

// Карточки: добавление через ссылки, удаление, увеличение
const initialCards = [
    {
      name: 'Фарерские острова',
      link: 'https://sun9-30.userapi.com/impg/zpSQCGYlC16plUoifF4tfb9nHuLsUwSPjbMIyA/U8qZ8ZK2JJY.jpg?size=799x799&quality=95&sign=6d9142ed1ac8a7b8461c95e6d33b3f1e&type=album'
    },
    {
      name: 'Италия',
      link: 'https://sun9-21.userapi.com/impg/y3ndk7_q2WGHtckI0uffHP5C04-BX9D3g5Gjzw/bN6BsUN5S6Q.jpg?size=799x799&quality=95&sign=07c3edce4aa5bae99737dda931d906c5&type=album'
    },
    {
      name: 'США',
      link: 'https://sun9-31.userapi.com/impg/lbxRuazlD6XbH_d_S9Rk9jW82u50667FaOCfvQ/2Q78DVzqenE.jpg?size=799x799&quality=95&sign=c26d4b84fd85a7e1479fa28958797f83&type=album'
    },
    {
      name: 'Новая Зеландия',
      link: 'https://sun9-36.userapi.com/impg/OrMgrTZKqrwAhPQEuzjxHLuvOgbKV3Rr9sTduQ/OQB-lSp79YM.jpg?size=799x799&quality=95&sign=cf7b683b19760243449440b8ef67c0f4&type=album'
    },
    {
      name: 'Россия',
      link: 'https://sun9-37.userapi.com/impg/Lu9mYrUjpXLjkXwDTyefZ5dFjHaiCtUVSux1nQ/qoWOakiJe4s.jpg?size=799x799&quality=95&sign=fc4667fccc9efce5db05a78c70f761ce&type=album'
    },
    {
      name: 'Исландия',
      link: 'https://sun9-72.userapi.com/impg/tQjmFZRbFt_h6srmVDUTHxdC-tGoqT7N4rNIdA/Kvau_Cpyudc.jpg?size=799x799&quality=95&sign=7bc7c94c7529195e9750f369220639b2&type=album'
    }
  ]; 

const elements = document.querySelector('.elements');
  
function createCard(card) {
    // добавляем карточку из массива initialCards
    const newCard = document.querySelector('#elements-template').content.cloneNode(true);
    const cardHeadind = newCard.querySelector('.elements__name');
    cardHeadind.textContent = card.name;
    const cardImage = newCard.querySelector('.elements__image');
    cardImage.setAttribute('src', card.link);
    const deleteButton = newCard.querySelector('.elements__delete');
    deleteButton.addEventListener('click', handleDeleteButtonClick);
    elements.append(newCard);

    // увеличиваем добавленные карточки
    cardImage.addEventListener("click", function () {
       openPhotoWindow(popupPhoto);
       bigImage.src = cardImage.src;
       bigImageHeading.textContent = cardHeadind.textContent;
    });

    // ставим карточкам лайк
    const likeElements = elements.querySelector('.elements__like');
    likeElements.addEventListener('click', function (like) {
       like.target.classList.toggle('elements__like_active');
    });
}
initialCards.forEach(createCard);

// добавляем карточки через форму
const renderCard = () => {
    const newCard = document.querySelector('#elements-template').content.cloneNode(true);
    const cardHeadind = newCard.querySelector('.elements__name');
    cardHeadind.textContent = placeInput.value;
    const cardImage = newCard.querySelector('.elements__image');
    cardImage.setAttribute('src', srcInput.value);
    const deleteButton = newCard.querySelector('.elements__delete');
    deleteButton.addEventListener('click', handleDeleteButtonClick);
    elements.prepend(newCard);

    // увеличиваем добавленные карточки
    cardImage.addEventListener("click", function () {
        openPhotoWindow(popupPhoto);
        bigImage.src = cardImage.src;
        bigImageHeading.textContent = cardHeadind.textContent;
    });

    // ставим карточкам лайк
    const likeElements = elements.querySelector('.elements__like');
    likeElements.addEventListener('click', function (like) {
       like.target.classList.toggle('elements__like_active');
    });
    return newCard;
}

formPlacesElement.addEventListener('submit', handleFormSubmitPhoto);

// удаляем добавленные карточки
function handleDeleteButtonClick(event) {
    const button = event.target;
    const card = button.closest('.elements__element');
    card.remove();
}

// Попап открытия больших картинок
const popupPhoto = document.querySelector('.popup_type_photo');
const openPhoto = document.querySelector('.elements__image');
const closePhoto = document.querySelector('.popup__icon_photo');
const bigImage = document.querySelector('.popup__image');
const bigImageHeading = document.querySelector('.popup__photo-about');

openPhoto.addEventListener('click', openPhotoWindow);
closePhoto.addEventListener('click', closeModalWindow);

function openPhotoWindow() {
    popupPhoto.classList.add('popup_opened');
}
