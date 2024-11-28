const setEventListeners = (formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
    const buttonEl = formEl.querySelector(".modal__button");

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

// THIS PORTION OF CODE IS CAUSING ME ISSUES. 
// I GOT IT FROM SPRINT 6, VIDEO 5 "toggleButtonState", minute 9:35 link = https://vimeo.com/964618827?share=copy

   /*if (hasInvalidInput(inputList)) {
        buttonEl.disabled = true; 
  } else {
    buttonEl.disabled = false;
  }*/
};

const resetValidation = (formEl, inputEl, inputList) => {
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