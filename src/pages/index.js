import './index.css';
import { config, apiData } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js'
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';

const buttonOpenEditProfilePopup = document.querySelector('.profile__button-edit');
const buttonOpenAddCardPopup = document.querySelector('.profile__button-add');
const avatar = document.querySelector('.profile__button-avatar');
const saveButton = document.querySelector('.popup__button');

const formProfileElement = document.querySelector('.popup__form_profile');
const formPlacesElement = document.querySelector('.popup__form_places');
const formAvatarElement = document.querySelector('.popup__form_avatar')
const placesCardValidator = new FormValidator(config, formPlacesElement);
const profileCardValidator = new FormValidator(config, formProfileElement);
const avatarCardValidator = new FormValidator(config, formAvatarElement);
placesCardValidator.enableValidation();
profileCardValidator.enableValidation();
avatarCardValidator.enableValidation();

const bigImg = new PopupWithImage('.popup_type_photo');
const popupDelete = new PopupWithSubmit('.popup_type_delete');
bigImg.setEventListeners();
popupDelete.setEventListeners();

const userInform = new UserInfo({
  selectorName: '.profile__title',
  selectorAbout: '.profile__subtitle',
  selectorAvatar: '.profile__image'
});

const api = new Api(apiData);
let placeList;
let userId;

const standartCards = api.getInitialCards()
  .then(function (data) {
    placeList = new Section({
      items: data.reverse(),
      renderer: (item) => {
        placeList.addItem(createCard(item));
      },
    },
    '.elements'
    );
  })
  .catch((err) => {console.log(err)});

const userInfo = api.getUserInfo()
  .then((data) => {
    userId = data._id;
    userInform.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    });
  })
  .catch((err) => {console.log(err)});

Promise.all([userInfo, standartCards])
.then(() => placeList.renderItems());

function createCard(card) {
    const newCard = new Card({
      data: card,
      userId: userId,
      handleCardClick: (name, link) => {
          bigImg.open(name, link);
      },
      handleDeleteCard(card) {
        popupDelete.open(() => {
          api.deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            popupDelete.close();
          })
        });
      },
      handleLikeCard(card) {
        api.getCardLike(card.getId())
        .then((data) => {card.toggleLike(data)})
      },
      handleDeleteLikeCard(card) {
        api.deleteCardLike(card.getId())
        .then((data) => {card.toggleLike(data)})
      },
    },
    '#elements-template'
    );
    const cardTemplate = newCard.generateCard();
    return cardTemplate;
}

const profilePopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    api.changeUserInfo({
      name: data.name,
      about: data.about,
    })
    .then(() => {
      userInform.setUserInfo({
        name: data.name,
        about: data.about,
      });
    })
    .then(() => profilePopup.close())
    .catch((err) => {console.log(err)})
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    })
  },
  },
  '.popup_type_profile'
);

profilePopup.setEventListeners();
buttonOpenEditProfilePopup.addEventListener('click', openProfilePopup);
function openProfilePopup() {
  profilePopup.open();
  profilePopup.setValues(userInform.getUserInfo());
  profileCardValidator.resetValidation();
}

const placePopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    api.addNewCard({
      name: data.place,
      link: data.link,
    })
    .then((data) => {
      placeList.addItem(createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        _id: data._id,
        owner: {_id: userId}
      })
      );
    })
    .then(() => placePopup.close())
    .catch((err) => {console.log(err)})
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
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

const avatarPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    api.changeAvatar({avatar: data.avatar})
    .then(() => {
      userInform.setAvatarLink(data.avatar);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
    },
  },
  '.popup_type_avatar'
  );

avatarPopup.setEventListeners();
avatar.addEventListener('click', openAvatarPopup);
function openAvatarPopup() {
  avatarPopup.open();
  avatarCardValidator.resetValidation();
  avatarCardValidator.disabledButton();
}