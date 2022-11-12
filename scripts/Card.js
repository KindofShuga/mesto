import {popupImage, popupImageImg, popupImageHeading, openPopup} from './index.js'

export default class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
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
    this._deleteElement = this._element.querySelector('.cards__delete');
    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;

    return this._element;
  }
  _enablePopupImage() {
    popupImageImg.src = this._link;
    popupImageImg.alt = this._name;
    popupImageHeading.textContent = this._name;
    openPopup(popupImage);
  }
  _activateLike() {
    this._likeElement.classList.toggle('cards__like_active');
  }
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._enablePopupImage();
    });
    this._likeElement.addEventListener('click', () => {
      this._activateLike();
    });
    this._deleteElement.addEventListener('click', () => {
      this._deleteCard();
    });
  }
};