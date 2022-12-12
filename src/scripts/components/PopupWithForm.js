import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._form = popupSelector.querySelector('.popup__form');
        this._submitForm = submitForm;
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitBtn = popupSelector.querySelector('.popup__submit-btn');
        this._textContent = this._submitBtn.textContent;
    }
    _renderLoading(isLoading)  {
        isLoading ? this._submitBtn.textContent = 'Сохранение...' : this._submitBtn.textContent = this._textContent;
      }
    _getInputValues() {
        this._inputs = {}
        this._inputList.forEach((input) => {
            this._inputs[input.name] = input.value;
        });
        return this._inputs;
    }
    createSubmitHandler(newSubmitForm) {
        this._submitForm = newSubmitForm;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._renderLoading(true);
            this._submitForm(this._getInputValues());
        });
    }
    close() {
        this._renderLoading(false);
        super.close();
        this._form.reset();
    }
}