const popupEditProfile = document.querySelector('.popup_type_profile');
const editButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelectorAll('.popup__button-close');
const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupEditPlace = document.querySelector('.popup_type_places');
const addButton = document.querySelector('.profile__button-add');
const formPlacesElement = document.querySelector('.popup__form_places');
const placeInput = document.querySelector('.popup__input_type_place');
const srcInput = document.querySelector('.popup__input_type_src');
const popupPhoto = document.querySelector('.popup_type_photo');
const bigImage = document.querySelector('.popup__image');
const bigImageHeading = document.querySelector('.popup__photo-about');
const elementsContainer = document.querySelector('.elements');
const newCardTemplate = document.querySelector('#elements-template').content;

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
}

function createCard(name, link) {
  const cardElement = newCardTemplate.querySelector(".elements__element").cloneNode(true);
  const cardHeadind = cardElement.querySelector('.elements__name');
  const cardImage = cardElement.querySelector('.elements__image');
  const deleteButton = cardElement.querySelector('.elements__delete');
    
  cardHeadind.textContent = name || placeInput.value || 'Всегда Исландия';
  cardImage.alt = name || placeInput.value || 'Всегда Исландия';
  cardImage.src = link || srcInput.value || 'https://sun9-72.userapi.com/impg/tQjmFZRbFt_h6srmVDUTHxdC-tGoqT7N4rNIdA/Kvau_Cpyudc.jpg?size=799x799&quality=95&sign=7bc7c94c7529195e9750f369220639b2&type=album';
  deleteButton.addEventListener('click', deleteButtonClick);
    
  // увеличиваем добавленные карточки
  cardImage.addEventListener("click", function () {
    openPhotoWindow(popupPhoto);
    bigImage.src = cardImage.src;
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

// установка слушателей
editButton.addEventListener('click', openProfileWindow);
addButton.addEventListener('click', function() {
  openPopup(popupEditPlace);
});

closeButton.forEach(function(event) {
  const button = event.closest('.popup');
  event.addEventListener('click', function() {
    closePopup(button);
  });
});

popupForm.addEventListener('submit', handleFormSubmitProfile);
formPlacesElement.addEventListener('submit', handleFormSubmitPhoto);