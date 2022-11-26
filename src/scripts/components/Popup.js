export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._closeBtn = popupSelector.querySelector('.popup__close-btn');
        this._handleEscClose = this._handleEscClose.bind(this)
    }
    open() {
        this._popupSelector.classList.add('popup__opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popupSelector.classList.remove('popup__opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        };
    }
    setEventListeners() {
        this._closeBtn.addEventListener('click', () => {
            this.close();
        });
        this._popupSelector.addEventListener('click', (event) => {
            if (event.target == event.currentTarget) {
                this.close();
            };
        });
    }
}