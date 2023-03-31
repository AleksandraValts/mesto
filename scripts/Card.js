import { openPopup, popupPhoto, bigImage, bigImageHeading } from './index.js';

class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._link = data.link;
        this._name = data.name;
    }
  
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.elements__element')
        .cloneNode(true);
        return cardElement;
    }
  
    _clickLikeActive() {
      this._cardLikeButton.classList.toggle('elements__like_active');
    }
  
    _deleteCard() {
      this._element.remove();
    }
  
    _openImage() {
        openPopup(popupPhoto);
        bigImage.src = this._link;
        bigImage.alt = this._nsme;
        bigImageHeading.textContent = this._name;
    }
  
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName = this._element.querySelector('.elements__name');
        this._cardName.textContent = this._name;
        this._cardLikeButton = this._element.querySelector('.elements__like');
        this._cardDeleteButton = this._element.querySelector('.elements__delete');
        this._setEventListeners();
        return this._element;
    }
  
    _setEventListeners = () => {
      this._cardLikeButton.addEventListener('click', () => this._clickLikeActive());
      this._cardDeleteButton.addEventListener('click', () => this._deleteCard());
      this._cardImage.addEventListener('click', () => this._openImage());
    }
  }

export {Card as createCard}






function kreateCard(name, link) {
    const cardElement = newCardTemplate.querySelector('.elements__element').cloneNode(true);
    const cardHeadind = cardElement.querySelector('.elements__name');
    const cardImage = cardElement.querySelector('.elements__image');
    const deleteButton = cardElement.querySelector('.elements__delete');
      
    cardHeadind.textContent = name;
    cardImage.alt = name;
    cardImage.src = link;
    deleteButton.addEventListener('click', deleteButtonClick);
      
    // увеличиваем добавленные карточки
    cardImage.addEventListener("click", function () {
      openPopup(popupPhoto);
      bigImage.src = cardImage.src;
      bigImage.alt = cardHeadind.textContent;
      bigImageHeading.textContent = cardHeadind.textContent;
    });
  
    // ставим карточкам лайк
    const likeElements = cardElement.querySelector('.elements__like');
    likeElements.addEventListener('click', function (like) {
      like.target.classList.toggle('elements__like_active');
    });
    
    return cardElement;
  }