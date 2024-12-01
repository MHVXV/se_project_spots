const settings = {
    formSelector: ".modal__form", //cardForm is different than the video
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn", //different than the video
    inactiveButtonClass: "modal__submit-btn_disabled", //different than the video; might need to add to modal.css
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible", //might need to add to modal.css
};

const setEventListeners = (formEl, settings) => {
    const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
    const buttonEl = formEl.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonEl, settings);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", function () {
            checkInputValidity(formEl, inputEl, settings);
            toggleButtonState(inputList, buttonEl, settings);
        });
    });
};

const showInputError = (formEl, inputEl, errorMsg, settings) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(settings.inputErrorClass);
};

const hideInputError = (formEl, inputEl, settings) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, settings) => {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, inputEl.validationMessage, settings);
    } else {
      hideInputError(formEl, inputEl, settings);
    }
  };

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, settings) => {
   if (hasInvalidInput(inputList)) {
        disableButton(buttonEl, settings);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(settings.inactiveButtonClass)
  }
};

const disableButton = (buttonEl, settings) => {
    buttonEl.disabled = true; 
    buttonEl.classList.add(settings.inactiveButtonClass);
}

const resetValidation = (formEl, inputList, settings) => {
    inputList?.forEach((input) => {
        hideInputError(formEl, input, settings);
    });
};

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, settings);
  });
};

enableValidation(settings);