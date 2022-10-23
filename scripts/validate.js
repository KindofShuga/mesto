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
const addInactiveButton = (button) => {
  button.setAttribute('disabled', true);
  button.classList.add(settings.inactiveButtonClass);
};
const removeInactiveButton = (button) => {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled', true);
};
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);
  addInactiveButton(buttonElement);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        isValid(form, input);
        if(hasInvalidInput(inputList)){
          addInactiveButton(buttonElement);
        } else {
          removeInactiveButton(buttonElement);
        };
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