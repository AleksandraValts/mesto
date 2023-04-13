class Card {
    constructor(data, {handleCardClick, templateSelector}) {
        this._templateSelector = templateSelector;
        this._link = data.link;
        this._name = data.name;
        this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.elements__element')
        .cloneNode(true);
        return cardElement;
    }
  
    _clickLike() {
      this._cardLikeButton.classList.toggle('elements__like_active');
    }
  
    _deleteCard() {
      this._element.remove();
      this._element = null;
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
  
    _setEventListeners() {
      this._cardLikeButton.addEventListener('click', () => this._clickLike());
      this._cardDeleteButton.addEventListener('click', () => this._deleteCard());
      this._cardImage.addEventListener('click', () => 
          this._handleCardClick(this._name, this._link));
    }
  }

export {Card}