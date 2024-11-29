//TODO - pass settings object to validatino functions that are called in this file

const initialCards = [
    {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
},
    {
    name: "Val Thorens", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
},
    {
    name: "Restaurant terrace", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
},
    {
    name: "An outdoor cafe", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
},
    {
    name: "A very long bridge, over the forest and through the trees", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
},
    {
    name: "Tunnel with morning light", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
},
    {
    name: "Mountain house", 
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
},
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddImgButton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#profile-edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseButton = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");

const addCardForm = document.forms["card-form"]
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form")
const cardModalCloseButton = cardModal.querySelector(".modal__close-btn");
const cardModalSubmitButton = cardModal.querySelector(".modal__submit-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

const previewModalCloseButton = previewModal.querySelector(".modal__close-btn_type_preview");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
    console.log(data);
  const cardElement = cardTemplate.content
        .querySelector(".card")
        .cloneNode(true);
const cardNameEl = cardElement.querySelector(".card__title");
const cardImageElement = cardElement.querySelector(".card__image");
const cardLikeBtn = cardElement.querySelector(".card__like-btn");
const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

cardNameEl.textContent = data.name;
cardImageElement.src = data.link;
cardImageElement.alt = data.name;

cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
});

cardDeleteBtn.addEventListener("click", () => {
    cardDeleteBtn.closest(".card").remove();
});

cardImageElement.addEventListener("click", () => {
openModal(previewModal);
previewModalImageEl.src = data.link;
previewModalImageEl.alt = data.name;
previewModalCaptionEl.textContent = data.name;
});

  return cardElement;
}

function openModal(modal) {
    modal.classList.add("modal_opened");
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    profileDescription.textContent = editModalDescriptionInput.value;
    closeModal(editModal);
  
}

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    console.log(cardNameInput.value);
    console.log(cardLinkInput.value);
    const inputValues = { name: cardNameInput.value, link: cardLinkInput.value};
    const cardEl = getCardElement(inputValues);
    cardsList.prepend(cardEl);
    disableButton(cardModalSubmitButton);
    closeModal(cardModal); 

    cardForm.reset();
};

profileEditButton.addEventListener("click", () => {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
    resetValidation(editFormElement, [editModalNameInput, editModalDescriptionInput], settings);
    openModal(editModal);
});

const closeButtons = document.querySelectorAll('.modal__close-btn');

closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closeModal(popup));
});

profileAddImgButton.addEventListener("click", () => {
    openModal(cardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit); 
cardForm.addEventListener("submit", handleAddCardSubmit);


initialCards.forEach((item) => {
    const cardEl = getCardElement(item);
    cardsList.append(cardEl);
});

document.body.addEventListener('click', (event) => {
    if (!event.target.closest('.modal__form')) {
      closeModal();
    }
  });