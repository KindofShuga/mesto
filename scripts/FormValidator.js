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
  _addInactiveButton(button) {
    button.setAttribute('disabled', true);
    button.classList.add(this._inactiveSubmitButton);
  };
  _removeInactiveButton(button) {
      button.classList.remove(this._inactiveSubmitButton);
      button.removeAttribute('disabled', true);
  };
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };
  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitButton);
    this._addInactiveButton(this._buttonElement);
    this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._isValid(input);
          if(this._hasInvalidInput(this._inputList)){
            this._addInactiveButton(this._buttonElement);
          } else {
            this._removeInactiveButton(this._buttonElement);
          };
        });
    });
  };
  enableValidation() {
    this._setEventListeners();
  };
};