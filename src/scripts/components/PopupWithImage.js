import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._closeBtn = popupSelector.querySelector('.popup-image__close-btn');
        this._popupImage = popupSelector.querySelector('.popup-image__image');
        this._heading = popupSelector.querySelector('.popup-image__heading');
    };
    open({ name, link }) {
        super.open()
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._heading.textContent = name;
    };
};