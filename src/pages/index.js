import './index.css';
import { initialCards, config } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

const buttonOpenEditProfilePopup = document.querySelector('.profile__button-edit');
const formProfileElement = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const buttonOpenAddCardPopup = document.querySelector('.profile__button-add');
const formPlacesElement = document.querySelector('.popup__form_places');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const placesCardValidator = new FormValidator(config, formPlacesElement);
const profileCardValidator = new FormValidator(config, formProfileElement);
placesCardValidator.enableValidation();
profileCardValidator.enableValidation();

const bigImg = new PopupWithImage('.popup_type_photo');
bigImg.setEventListeners();

function createCard(item) {
    const card = new Card({
        data: item,
        handleCardClick: (name, link) => {
            bigImg.open(name, link);
        },
    },
    '#elements-template'
    );
    const cardTemplate = card.generateCard();
    return cardTemplate;
}

const placeList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        placeList.addItem(cardElement);
    },
    },
    '.elements'
);

placeList.renderItems();

const userInform = new UserInfo({
    selectorName: '.profile__title',
    selectorAbout: '.profile__subtitle',
});

const profilePopup = new PopupWithForm({
    handleFormSubmit: (data) => {
        profileName.textContent = data['popup-name'];
        profileAbout.textContent = data['popup-text'];
        userInform.setUserInfo({
            name: data['popup-name'],
            about: data['popup-text']
        });
        },
    },
    '.popup_type_profile'
);

profilePopup.setEventListeners();
buttonOpenEditProfilePopup.addEventListener('click', openProfilePopup);

function openProfilePopup() {
    profilePopup.open();
    profileCardValidator.resetValidation();
    const userData = userInform.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
  }

const placePopup = new PopupWithForm({
    handleFormSubmit: (data) => {
        const cardData = createCard({ 
            name: data['popup-place'],
            link: data['popup-src']
        });
        placeList.addItem((cardData));
    },
    },
    '.popup_type_places'
);


placePopup.setEventListeners();
buttonOpenAddCardPopup.addEventListener('click', openPlacePopup);

function openPlacePopup() {
    placePopup.open();
    placesCardValidator.resetValidation();
    placesCardValidator.disabledButton();
}