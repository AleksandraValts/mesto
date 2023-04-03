import { initialCards, config } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupEditProfile = document.querySelector('.popup_type_profile');
const buttonOpenEditProfilePopup = document.querySelector('.profile__button-edit');
const buttonsClosePopup = document.querySelectorAll('.popup__button-close');
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// добавлено закрытие при нажатии на Esc
function closePopupByEsc(esc) {
  if (esc.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openProfileWindow() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  profileWindowValidationReset.resetValidation();
}

function handleFormSubmitProfile (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleFormSubmitPhoto (evt) {
  evt.preventDefault(); 
  const photoAdded = new Object();
  photoAdded.name = placeInput.value;
  photoAdded.link = srcInput.value;
  addCard(photoAdded, '#elements-template');
  closePopup(popupEditPlace);
  evt.target.reset();
};

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], '#elements-template');
}

function createCard(initialCards, templateSelector) {
  const cardElement = new Card(initialCards, templateSelector);
  const cardTemplate = cardElement.generateCard();
  return cardTemplate;
}

function addCard(name, link) {
  const cardElement = createCard(name, link);
  elementsContainer.prepend(cardElement);
}

buttonOpenEditProfilePopup.addEventListener('click', openProfileWindow);
buttonOpenAddCardPopup.addEventListener('click', function() {
  openPopup(popupEditPlace);
  placeWindowValidationReset.resetValidation();
});

buttonsClosePopup.forEach(function(event) {
  const button = event.closest('.popup');
  event.addEventListener('click', function() {
    closePopup(button);
  })
})

// добавлено закрытие при нажатии на оверлей
popupsAll.forEach(function(close) {
  close.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(close);
    }
  })
})

placesCardValidator.enableValidation();
profileCardValidator.enableValidation();

popupForm.addEventListener('submit', handleFormSubmitProfile);
formPlacesElement.addEventListener('submit', handleFormSubmitPhoto);

export { openPopup, popupPhoto, bigImage, bigImageHeading }