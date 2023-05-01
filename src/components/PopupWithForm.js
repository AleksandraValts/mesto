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

    open() {
        super.open();
        this._save();
    }
    
    _loading() {
        this._submitButtonElement.textContent = 'Сохранение...';
    }

    _save() {
        this._submitButtonElement.textContent = 'Cохранить';
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputElement.forEach(
            input => this._inputValues[input.name] = input.value);
        return this._inputValues;
    }

    setValues(data) {
        this._changedInputValues = {};
        data = Object.values(data);
        for (let i = 0; i < data.length; i++) {
            this._inputElement[i].value = data[i];
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._loading();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}

export { PopupWithForm }