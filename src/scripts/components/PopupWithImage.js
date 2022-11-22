import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, event) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup-image__image');
        this._heading = this._popupSelector.querySelector('.popup-image__heading');
        this._link = event.target.src;
        this._name = event.target.alt;
    };
    open() {
        super.open()
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._heading.textContent = this._name;
    }
}