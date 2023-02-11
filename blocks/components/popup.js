let popup = document.querySelector('.popup_opened');
let openButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector(".popup__icon");
let popupSave = document.querySelector(".popup__save");

openButton.addEventListener('click', vision);
closeButton.addEventListener('click', unvision);
popupSave.addEventListener('click', unvision);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__about');
let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');

function info() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
};

function vision() {
    info ();
    popup.classList.add('popup_opened');
}
vision();

function unvision() {
    popup.classList.remove('popup_opened');
}
unvision();

function handleFormSubmit (evt) {
   evt.preventDefault(); 
   profileName.textContent = nameInput.value;
   profileAbout.textContent = jobInput.value;
   unvision();
}

formElement.addEventListener('submit', handleFormSubmit); 