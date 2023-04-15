import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor({handleFormSubmit}, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputElement = this._popup.querySelectorAll('.popup__input');  
        this._submitButtonElement = this._popup.querySelector('.popup__button');
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputElement.forEach(
            (input) => (this._inputValues[input.name] = input.value));
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }
}

export { PopupWithForm }