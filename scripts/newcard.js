
function closeModalWindow() {
    popupPlace.classList.remove('popup_opened');
}


// Попап добавления новых картинок (мест)
let popupPlace = document.querySelector('.popup_type_places');
let addButton = document.querySelector('.profile__button-add');
let closeAddButton = document.querySelector('.popup__icon_places');
let popupAddSave = document.querySelector('.popup__button_places');

addButton.addEventListener('click', openPlaceWindow);
closeAddButton.addEventListener('click', closeModalWindow);

let formPlacesElement = document.querySelector('.popup__form_places');
let placeInput = document.querySelector('.popup__input_type_place');
let srcInput = document.querySelector('.popup__input_type_src');

function openPlaceWindow() {
    popupPlace.classList.add('popup_opened');
}

function handleFormSubmitPhoto (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closeModalWindow();
}
formElement.addEventListener('submit', handleFormSubmitPhoto);



