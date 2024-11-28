const setEventListeners = (formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
    const buttonEl = formEl.querySelector(".modal__submit-btn");

    toggleButtonState(inputList, buttonEl);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", function () {
            checkInputValidity(formEl, inputEl);
            toggleButtonState(inputList, buttonEl);
        });
    });
};

const showInputError = (formEl, inputEl, errorMsg) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputEl) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
      hideInputError(formEl, inputEl);
    }
  };

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
   if (hasInvalidInput(inputList)) {
        disableButton(buttonEl);
  } else {
    buttonEl.disabled = false;
    // - TODO remove the disabled class
  }
};

const disableButton = (buttonEl) => {
    buttonEl.disabled = true; 
    // - TODO - Add a modifier class to the buttonEl to make it grey
    // Don't forget the CSS
}

const resetValidation = (formEl, inputList) => {
    inputList?.forEach((input) => {
        hideInputError(formEl, input);
    });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();