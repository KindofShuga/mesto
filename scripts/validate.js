const isValid = (form, input) => {
    if (!input.validity.valid) {
      showError(form, input, input.validationMessage);
    }
    else {
      hideError(form, input);
    };
};
const showError = (form, input, errorMessage) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass)
    errorElement.textContent = errorMessage;
};
const hideError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};
const madeButtonInactive = (settings, currentPopup) => {
  const button = currentPopup.querySelector(settings.submitButtonSelector);
  button.setAttribute('disabled', true);
  button.classList.add(settings.inactiveButtonClass);
};
const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
};
const toggleButtonState = (inputList, button) => {
    if (hasInvalidInput(inputList)) {
      button.classList.add(settings.inactiveButtonClass);
      button.setAttribute('disabled', true)
    } else {
      button.classList.remove(settings.inactiveButtonClass);
      button.removeAttribute('disabled', true)
    }
};
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        isValid(form, input);
        toggleButtonState(inputList, buttonElement);
      });
  });
};


const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    setEventListeners(form);
  });
};
enableValidation(settings);