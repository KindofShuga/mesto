import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._form = popupSelector.querySelector('.popup__form');
        this._submitForm = submitForm;
        this._inputList = this._form.querySelectorAll('.popup__input');
    }
    _getInputValues() {
        this._inputs = {}
        this._inputList.forEach((input) => {
            this._inputs[input.name] = input.value;
        });
        return this._inputs;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}