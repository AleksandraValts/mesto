import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._bigImg = this._popup.querySelector('.popup__image');
        this._bigImgAbout = this._popup.querySelector('.popup__photo-about');
    }

    open(about, image) {
        this._bigImgAbout.textContent = about;
        this._bigImg.src = image;
        this._bigImg.alt = about;
        super.open();
    }   
}

export { PopupWithImage }