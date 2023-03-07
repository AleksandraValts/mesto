const showInputError = (formElement, inputElement, errorMessage, events) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(events.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(events.errorClass);
};

const hideInputError = (formElement, inputElement, events) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(events.inputErrorClass);
  errorElement.classList.remove(events.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, events) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, events);
  } else {
    hideInputError(formElement, inputElement, events);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
};

const toggleButtonState = (inputList, buttonElement, events) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(events.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(events.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  };
}; 

const setEventListeners = (formElement, events) => {
  const inputList = Array.from(formElement.querySelectorAll(events.inputSelector));
  const buttonElement = formElement.querySelector(events.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, events);

  formElement.addEventListener('reset', () => {
    setTimeout(() => {  
      toggleButtonState(inputList, buttonElement, events), 0 });
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, events);
      toggleButtonState(inputList, buttonElement, events);
    });
  });
};

const enableValidation = (events) => {
  const formList = Array.from(document.querySelectorAll(events.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, events);
    }); 
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
});

