export default class FormValidator {
  constructor(settings, form) {
    this._input = settings.inputSelector;
    this._submitButton = settings.submitButtonSelector;
    this._inactiveSubmitButton = settings.inactiveButtonClass;
    this._inputError = settings.inputErrorClass;
    this._error = settings.errorClass;
    this._form = form;
  }
  _isValid(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    }
    else {
      this._hideError(input);
    };
  }
  _showError(input, errorMessage) {
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputError);
    this._errorElement.classList.add(this._error)
    this._errorElement.textContent = errorMessage;
  };
  _hideError(input) {
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputError);
    this._errorElement.classList.remove(this._error);
    this._errorElement.textContent = '';
  };
  _addInactiveButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveSubmitButton);
  };
  _removeInactiveButton() {
    this._buttonElement.classList.remove(this._inactiveSubmitButton);
    this._buttonElement.removeAttribute('disabled', true);
  };
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._addInactiveButton();
    } else {
      this._removeInactiveButton();
    }
  };
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });
  }
  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitButton);
    this._addInactiveButton();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  };
  enableValidation() {
    this._setEventListeners();
  };
};