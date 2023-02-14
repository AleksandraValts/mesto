let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector(".popup__icon");
let popupSave = document.querySelector(".popup__button");

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
    popup.classList.add('popup_opened');
}

function closeModalWindow() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closeModalWindow();
}

formElement.addEventListener('submit', handleFormSubmit); 