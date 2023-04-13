import { initialCards, config } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
//import './index.css';

const popupEditProfile = document.querySelector('.popup_type_profile');
const buttonOpenEditProfilePopup = document.querySelector('.profile__button-edit');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupEditPlace = document.querySelector('.popup_type_places');
const buttonOpenAddCardPopup = document.querySelector('.profile__button-add');
const formPlacesElement = document.querySelector('.popup__form_places');
const placeInput = document.querySelector('.popup__input_type_place');
const srcInput = document.querySelector('.popup__input_type_src');
const popupPhoto = document.querySelector('.popup_type_photo');
const bigImage = document.querySelector('.popup__image');
const bigImageHeading = document.querySelector('.popup__photo-about');
const elementsContainer = document.querySelector('.elements');
const popupsAll = document.querySelectorAll('.popup');

const placesCardValidator = new FormValidator(config, formPlacesElement);
const profileCardValidator = new FormValidator(config, popupForm);
const profileWindowValidationReset = new FormValidator(config, popupEditProfile);
const placeWindowValidationReset = new FormValidator(config, popupEditPlace);

//Создать экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_type_places');

//Создать экземпляр класса Section для карточек
const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(cardItem, {
            templateSelector: '#elements-template',
            handleCardClick: (evt) => {
               popupWithImage.open(evt);
            },
        });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  '.elements'
);

//Отрисовать карточки
cardList.renderItems();

//Создать экземпляр класса UserInfo
const userInfo = new UserInfo({
  selectorName: '.profile__title',
  selectorAbout: '.profile__subtitle',
});

//Создать экземпляр класса PopupWithForm для userPopup
const newProfilePopup = new PopupWithForm({
    handleFormSubmit: () => {
      userInfo.setUserInfo({
        name: nameInput.value,
        about: jobInput.value,
      });
     // popUpProfileValidation.resetInputs();
    },
  },
    '.popup_type_profile'
  );
  //Открыть userPopup
 newProfilePopup.setEventListeners(userInfo.getUserInfo());
  buttonOpenEditProfilePopup.addEventListener('click', () => {
    newProfilePopup.open();
  });

//Создать экземпляр класса PopupWithForm для photoPopup
  const newCardPopup = new PopupWithForm(
    {
      handleFormSubmit: () => {
        const cardData = { name: placeInput.value, link: srcInput.value };
        cardList.addItem(createNewCard(cardData));
        placesCardValidator.resetInputs();
        //popUpCardsValidation.disabledButton();
      },
    },
    '.popup_type_places'
  );
  newCardPopup.setEventListeners();
  // навешиваем слушатель на кнопку
  buttonOpenAddCardPopup.addEventListener("click", () => {
    newCardPopup.open();
  });
