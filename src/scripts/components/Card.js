export default class Card {
  constructor(data, templateSelector, { handleCardClick, handleDeleteClick, handleLikeClick }, userId) {
    this._link = data.link;
    this._name = data.name;
    this._likesAmount = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }
  _getTemplate() {
    const newCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
    return newCard;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.cards__image');
    this._likeElement = this._element.querySelector('.cards__like');
    this.setLikesAmount(this._likesAmount);

    this._deleteElement = this._element.querySelector('.cards__delete');
    if (this._ownerId !== this._userId) {
      this._deleteElement.style.display = 'none';
    }

    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;

    return this._element;
  }
  _activateLike() {
    this._likeElement.classList.add('cards__like_active');
  }
  _disableLike() {
    this._likeElement.classList.remove('cards__like_active');
  }
  isLiked() {
    return this._likesAmount.find(user => user._id === this._userId);
  }
  setLikesAmount(newLikes) {
    this._likesAmount = newLikes;
    this._amountElement = this._element.querySelector('.cards__likes-amount');
    this._amountElement.textContent = this._likesAmount.length;

    if(this.isLiked()) {
      this._activateLike();
    } else {
      this._disableLike();
    };
  }
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
  _setEventListeners() {
    this._imageElement.addEventListener('click', this._handleCardClick);
    this._likeElement.addEventListener('click', this._handleLikeClick);
    this._deleteElement.addEventListener('click', this._handleDeleteClick);
  }
};