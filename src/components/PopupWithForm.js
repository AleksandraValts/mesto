import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor({handleformSubmit}, popupSelector) {
        super(popupSelector);
        this._handleformSubmit = handleformSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputElement = Array.from(this._formElement.querySelectorAll('.popup__input'));
        
        this._submitButtonElement = this._popup.querySelector('.popup__button');
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputElement.forEach((input) => 
        (this._inputValues[input.name] = input.value));
        return this._inputValues;
    }

    setEventListeners() {
        super._setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleformSubmit(this._getInputValues());
        });
    }
}

export { PopupWithForm }