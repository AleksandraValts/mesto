const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  };

  class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this.config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this.config.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorClass);
    };
      
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.config.inputErrorClass);
        errorElement.classList.remove(this.config.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        };
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
          this._buttonElement.classList.add(this.config.inactiveButtonClass);
          this._buttonElement.setAttribute('disabled', true);
        } else {
          this._buttonElement.classList.remove(this.config.inactiveButtonClass);
          this._buttonElement.removeAttribute('disabled', true);
        };
    };

    _setEventListeners() {
        this._toggleButtonState();
       
        // добавлено после ревью
        this._formElement.addEventListener('reset', () => {
          setTimeout(() => {  
            this._toggleButtonState(), 0});
        });
      
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
        });
    };

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this.config.inputSelector));
        formList.forEach((formElement) => {
          formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
          this._setEventListeners();
          }); 
      };
    }

    export {config, FormValidator}