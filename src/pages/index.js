import './index.css';
import { initialCards, config, popupEditProfile, 
         buttonOpenEditProfilePopup, popupForm, 
         nameInput, jobInput, popupEditPlace, 
         buttonOpenAddCardPopup, formPlacesElement,
         placeInput, srcInput } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

const placesCardValidator = new FormValidator(config, formPlacesElement);
const profileCardValidator = new FormValidator(config, popupForm);
const profileWindowValidationReset = new FormValidator(config, popupEditProfile);
const placeWindowValidationReset = new FormValidator(config, popupEditPlace);
placesCardValidator.enableValidation();
profileCardValidator.enableValidation();

const bigImg = new PopupWithImage('.popup_type_photo');
bigImg.setEventListeners();

const userInform = new UserInfo({
  selectorName: '.profile__title',
  selectorAbout: '.profile__subtitle',
});

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

const profilePopup = new PopupWithForm({
    handleFormSubmit: () => {
        userInform.setUserInfo({
            name: nameInput.value,
            about: jobInput.value,
        });
        profileWindowValidationReset.resetValidation();
    },
    },
    '.popup_type_profile'
);

profilePopup.setEventListeners(userInform.getUserInfo());
buttonOpenEditProfilePopup.addEventListener('click', () => {
    profilePopup.open();
    const userData = userInform.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
});

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

const placePopup = new PopupWithForm({
    handleFormSubmit: () => {
        const cardData = { name: placeInput.value, link: srcInput.value };
        placeList.addItem(createCard(cardData));
        placeWindowValidationReset.resetValidation();
        placeWindowValidationReset.disabledButton();
    },
    },
    '.popup_type_places'
);

placePopup.setEventListeners();
buttonOpenAddCardPopup.addEventListener('click', () => {
    placePopup.open();
});