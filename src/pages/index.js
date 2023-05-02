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

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);

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
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInform.setUserInfo(userData);
    standartCards.renderItems(cards);
  })
  .catch(err => {console.log(err)});

const standartCards = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    standartCards.addItem(cardElement);
    },
  },
  '.elements'
);

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
          .catch((err) => {console.log(err)})
        });
      },
      handleLikeCard(card) {
        api.getCardLike(card.getId())
        .then((data) => {card.toggleLike(data)})
        .catch((err) => {console.log(err)})
      },
      handleDeleteLikeCard(card) {
        api.deleteCardLike(card.getId())
        .then((data) => {card.toggleLike(data)})
        .catch((err) => {console.log(err)})
      },
    },
    '#elements-template'
    );
    const cardTemplate = newCard.generateCard();
    return cardTemplate;
}

const profilePopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    profilePopup.renderLoading(true);
    api.changeUserInfo(data)
    .then((res) => {
      userInform.setUserInfo(res);
    })
    .then(() => profilePopup.close())
    .catch((err) => {console.log(err)})
    .finally(() => {
      profilePopup.renderLoading(false);
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
  formValidators['popup-form'].resetValidation();
}

const placePopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    placePopup.renderLoading(true);
    api.addNewCard({
      name: data.place,
      link: data.link,
    })
    .then((data) => {
      const cardElement = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        _id: data._id,
        owner: {_id: userId}
      })
      standartCards.addItem(cardElement);
    })
    .then(() => placePopup.close())
    .catch((err) => {console.log(err)})
    .finally(() => {
      placePopup.renderLoading(false);
    });
    },
  },
  '.popup_type_places'
);

placePopup.setEventListeners();
buttonOpenAddCardPopup.addEventListener('click', openPlacePopup);
function openPlacePopup() {
  placePopup.open();
  formValidators['popup-places'].resetValidation();
  formValidators['popup-places'].disabledButton();
}

const avatarPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api.changeAvatar(data)
    .then((res) => {
      userInform.setUserInfo(res);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
    },
  },
  '.popup_type_avatar'
  );

avatarPopup.setEventListeners();
avatar.addEventListener('click', openAvatarPopup);
function openAvatarPopup() {
  avatarPopup.open();
  formValidators['popup-avatar'].resetValidation();
  formValidators['popup-avatar'].disabledButton();
}