import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4d56d901-fb31-44ec-9737-2c59f5a75d18",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then((response) => {
    const [cards, userInfo] = response;
    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });

    document.querySelector(".profile__avatar").src = userInfo.avatar;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  })
  .catch(console.error);

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddImgButton = document.querySelector(".profile__add-btn");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#profile-edit-modal");
const profileForm = document.forms["profile-form"];
const editModalCloseButton = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

// Avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector["#edit-avatar-form"];
const avatarModalCloseButton = avatarModal.querySelector(".modal__close-btn");
const avatarModalSubmitButton = avatarModal.querySelector(".modal__submit-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// Delete form elements
const deleteModal = document.querySelector("#delete-modal");

// Card form elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = document.forms["card-form"];
const cardModalCloseButton = cardModal.querySelector(".modal__close-btn");
const cardModalSubmitButton = cardModal.querySelector(".modal__submit-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

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

  cardDeleteBtn.addEventListener("click", handleDeleteCard, () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      // (DONE) - Use data argument instead of the input values
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(cardNameInput.value);
  console.log(cardLinkInput.value);
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardEl = getCardElement(inputValues);
  cardsList.prepend(cardEl);
  disableButton(cardModalSubmitButton, settings);
  closeModal(cardModal);
  cardForm.reset();
}

// TODO - Finish avatar submission handler from video 5
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  console.log(avatarInput.value);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      console.log(data.avatar);
      // Make this work, set the new avatar element from video 5
    })
    .catch(console.error);
}

function handleDeleteCard(evt) {
  //evt.target.closest(".card").remove();
  openModal(deleteModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    profileForm,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  openModal(editModal);
});

const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

profileAddImgButton.addEventListener("click", () => {
  openModal(cardModal);
});

profileForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeOverlay);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

function closeOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

// TODO - set up the close button listener from video 5
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarForm.addEventListener("submit", handleAvatarSubmit);

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeOverlay);
}

enableValidation(settings);
