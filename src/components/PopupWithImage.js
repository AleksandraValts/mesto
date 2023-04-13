import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector, image) {
        super(popupSelector);
        this._image = image;
    }

    open() {
        const bigImg = this._popup.querySelector('.popup__image');
        const bigImgAbout = this._popup.querySelector('.popup__photo-about');
        bigImg.src = this._image.link;
        bigImg.alt = this._image.name;
        bigImgAbout.textContent = this._image.name;
        super.open();
    }   
}

export { PopupWithImage }