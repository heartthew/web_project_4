import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { popupImage, openPopup, closePopup } from "./utils.js";
import { starterCards } from "./initialize.js";

const defaultConfig = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "form__type-error",
    errorClass: "popup__error_visible"
}

// Wrappers
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const elements = document.querySelector('.elements');

// Forms
const formAdd = document.querySelector(".form_add");
const formEdit = document.querySelector(".form_edit");

// Inputs
const person = formEdit.querySelector(".form__item_input_name");
const job = formEdit.querySelector(".form__item_input_job");
const imgTitle = formAdd.querySelector(".form__item_input_title");
const image = formAdd.querySelector(".form__item_input_image");

// Open Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Close Buttons
const closeAdd = document.querySelector(".popup__close-button_type_add");
const closeEdit = document.querySelector(".popup__close-button_type_edit");
const closeImg = document.querySelector(".popup__close-button_type_full");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileOccupation = profileInfo.querySelector(".profile__occupation");

const newData = [{
    name: "",
    link: ""
}, ];


// Validators
const editFormValidator = new FormValidator(defaultConfig, formEdit);
const addFormValidator = new FormValidator(defaultConfig, formAdd);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const renderCard = (data, wrap) => {
    const card = new Card(data, ".element-template");
    wrap.prepend(card.createCard());
};

starterCards.forEach(data => {
    const card = new Card(data, ".element-template");
    elements.prepend(card.createCard());
});

const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    newData.name = imgTitle.value;
    newData.link = image.value;
    renderCard(newData, elements);
    closePopup(popupAdd);
};

const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = person.value;
    profileOccupation.textContent = job.value;
    closePopup(popupEdit);
};

popupImage.addEventListener("click", (evt) => {
    if (evt.target === popupImage) {
        closePopup(popupImage);
    }
});

popupEdit.addEventListener("click", (evt) => {
    if (evt.target === popupEdit) {
        closePopup(popupEdit);
    }
});

popupAdd.addEventListener("click", (evt) => {
    if (evt.target === popupAdd) {
        closePopup(popupAdd);
    }
});

addButton.addEventListener("click", () => {
    imgTitle.value = "";
    image.value = "";
    openPopup(popupAdd);
});

editButton.addEventListener("click", () => {
    person.value = profileName.textContent;
    job.value = profileOccupation.textContent;
    openPopup(popupEdit);
});

closeAdd.addEventListener("click", () => {
    closePopup(popupAdd);
});

closeEdit.addEventListener("click", () => {
    closePopup(popupEdit);
});

closeImg.addEventListener("click", () => {
    closePopup(popupImage);
});

formAdd.addEventListener("submit", handleAddFormSubmit);
formEdit.addEventListener("submit", handleEditFormSubmit);