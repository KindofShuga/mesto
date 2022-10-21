const isValid = (form, input) => {
    if (!input.validity.valid) {
      showError(form, input, input.validationMessage);
    } 
    else {
      hideError(form, input);
    }
  }