export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._closeBtn = popupSelector.querySelector('.popup__close-btn');
    }
    open() {
        this._popupSelector.classList.add('popup__opened');
    }
    close() {
        this._popupSelector.classList.remove('popup__opened');
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
        this._popupSelector.addEventListener('keydown', (event) => {
            this._handleEscClose(event);
        }, { once: true });
    }
}