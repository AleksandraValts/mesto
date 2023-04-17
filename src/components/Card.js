class Card {
    constructor({data, handleCardClick}, templateSelector) {
        this._templateSelector = templateSelector;
        this._link = data.link;
        this._name = data.name;
        this.handleCardClick = handleCardClick;
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
      this.cardLikeButton.classList.toggle('elements__like_active');
    }
  
    _deleteCard() {
      this._element.remove();
      this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this.cardImage = this._element.querySelector('.elements__image');
        this.cardImage.src = this._link;
        this.cardImage.alt = this._name;
        this.cardName = this._element.querySelector('.elements__name');
        this.cardName.textContent = this._name;
        this.cardLikeButton = this._element.querySelector('.elements__like');
        this.cardDeleteButton = this._element.querySelector('.elements__delete');
        this._setEventListeners();
        return this._element;
    }
  
    _setEventListeners() {
      this.cardLikeButton.addEventListener('click', () => this._clickLike());
      this.cardDeleteButton.addEventListener('click', () => this._deleteCard());
      this.cardImage.addEventListener('click', () => 
          this.handleCardClick(this._name, this._link));
    }
  }

export {Card}