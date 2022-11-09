import {popupImage, popupImageImg, popupImageHeading, popupImageCloseButton, openPopup, closePopup} from './index.js'

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
    this._setEventListeners();

    this._elementImage = this._element.querySelector('.cards__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;

    return this._element;
  }
  
  _setEventListeners() {
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      popupImageImg.src = this._link;
      popupImageImg.alt = this._name;
      popupImageHeading.textContent = this._name;
      openPopup(popupImage);
      popupImageCloseButton.addEventListener('click', () => {
        closePopup(popupImage);
      });
    });
    this._element.querySelector('.cards__like').addEventListener('click', (event) => {
          event.target.classList.toggle('cards__like_active');
    });
    this._element.querySelector('.cards__delite').addEventListener('click', () => {
      this._element.remove();
    });
  }
};