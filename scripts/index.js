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
const newCardTemplate = document.querySelector('#elements-template').content;
const popupsAll = document.querySelectorAll('.popup');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
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
}

function openPhotoWindow() {
  popupPhoto.classList.add('popup_opened');
}

function handleFormSubmitProfile (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleFormSubmitPhoto (evt) {
  evt.preventDefault(); 
  addCard(placeInput.value, srcInput.value);
  closePopup(popupEditPlace);
  evt.target.reset();

  // проверка значений полей и установка кнопки
  const disabledButton = popupEditPlace.querySelector('.popup__button');
  if (placeInput.value === '' || srcInput.value === '') {
    disabledButton.classList.add('popup__button_disabled');
  };
};

function createCard(name, link) {
  const cardElement = newCardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardHeadind = cardElement.querySelector('.elements__name');
  const cardImage = cardElement.querySelector('.elements__image');
  const deleteButton = cardElement.querySelector('.elements__delete');
    
  cardHeadind.textContent = name || 'Coming soon...';
  cardImage.alt = name || 'Скоро';
  cardImage.src = link || 'https://avatars.mds.yandex.net/get-kinopoisk-image/4716873/71fdc731-bf53-49f9-87af-449bbff73115/orig';
  deleteButton.addEventListener('click', deleteButtonClick);
    
  // увеличиваем добавленные карточки
  cardImage.addEventListener("click", function () {
    openPhotoWindow(popupPhoto);
    bigImage.src = cardImage.src;
    bigImage.alt = cardHeadind.textContent;
    bigImageHeading.textContent = cardHeadind.textContent;
  });

  // ставим карточкам лайк
  const likeElements = cardElement.querySelector('.elements__like');
  likeElements.addEventListener('click', function (like) {
    like.target.classList.toggle('elements__like_active');
  });
  
  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].name, initialCards[i].link);
}

function addCard(name, link) {
  const cardElement = createCard(name, link);
  elementsContainer.prepend(cardElement);
}

function deleteButtonClick(event) {
  const button = event.target;
  const card = button.closest('.elements__element');
  card.remove();
}

buttonOpenEditProfilePopup.addEventListener('click', openProfileWindow);
buttonOpenAddCardPopup.addEventListener('click', function() {
  openPopup(popupEditPlace);
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

popupForm.addEventListener('submit', handleFormSubmitProfile);
formPlacesElement.addEventListener('submit', handleFormSubmitPhoto);