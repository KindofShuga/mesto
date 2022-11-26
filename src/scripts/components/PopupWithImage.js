import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, {name, link}) {
        super(popupSelector);
        this._closeBtn = popupSelector.querySelector('.popup-image__close-btn');
        this._popupImage = popupSelector.querySelector('.popup-image__image');
        this._heading = popupSelector.querySelector('.popup-image__heading');
        this._name = name;
        this._link = link;
    };
    open() {
        super.open()
        super.setEventListeners();
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._heading.textContent = this._name;
    }
}