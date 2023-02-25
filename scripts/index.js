// Объявление переменных
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

// Объявление функций
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
    renderCard(placeInput.value, srcInput.value);
    closePopup(popupEditPlace);
    evt.target.reset();
}

// добавляем карточку из массива initialCards
function createCard(card) {
    
    const cardElement = newCardTemplate.querySelector(".elements__element").cloneNode(true);
    const cardHeadind = cardElement.querySelector('.elements__name');
    cardHeadind.textContent = card.name;
    const cardImage = cardElement.querySelector('.elements__image');
    cardImage.setAttribute('src', card.link);
    const deleteButton = cardElement.querySelector('.elements__delete');
    deleteButton.addEventListener('click', deleteButtonClick);
    elementsContainer.append(cardElement);

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
    return newCardTemplate;
}
initialCards.forEach(createCard);

// добавляем карточки через форму
const renderCard = () => {
    const newCardTemplate = document.querySelector('#elements-template').content.cloneNode(true);
    const cardHeadind = newCardTemplate.querySelector('.elements__name');
    cardHeadind.textContent = placeInput.value;
    const cardImage = newCardTemplate.querySelector('.elements__image');
    cardImage.setAttribute('src', srcInput.value);
    const deleteButton = newCardTemplate.querySelector('.elements__delete');
    deleteButton.addEventListener('click', deleteButtonClick);
    elementsContainer.prepend(newCardTemplate);

    cardImage.addEventListener('click', function () {
        openPhotoWindow(popupPhoto);
        bigImage.src = cardImage.src;
        bigImageHeading.textContent = cardHeadind.textContent;
    });

    const likeElements = elementsContainer.querySelector('.elements__like');
    likeElements.addEventListener('click', function (like) {
       like.target.classList.toggle('elements__like_active');
    });
    return newCardTemplate;
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