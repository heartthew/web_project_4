import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { startCards } from '../initialize.js';
import { defaultConfig } from '../utils.js';
import './index.css';

// Wrappers
const elements = document.querySelector('.elements');
// Forms
const formAdd = document.querySelector('.form_add');
const formEdit = document.querySelector('.form_edit');
// Inputs
const person = formEdit.querySelector(".form__item_input_name");
const job = formEdit.querySelector(".form__item_input_job");
const imgTitle = formAdd.querySelector('.form__item_input_title');
const image = formAdd.querySelector('.form__item_input_image');
// Open Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Validators
const editFormValidator = new FormValidator(defaultConfig, formEdit);
const addFormValidator = new FormValidator(defaultConfig, formAdd);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Popups
const popupEdit = new PopupWithForm('.popup_type_edit');
const popupAdd = new PopupWithForm('.popup_type_add');
const popupImage = new PopupWithImage('.popup_type_image');
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

const cards = new Section({
        items: startCards,
        renderer: (cardItem) => {
            const card = new Card(cardItem, ".element-template")
            const cardElement = card.createCard();
            cards.addItem(cardElement);
        }
    },
    ".element-template"
);
cards.renderer();

const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    newData.name = imgTitle.value;
    newData.link = image.value;
    renderCard(newData, elements);
    close(popupAdd);
};
const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    setUserInfo(userInfo);
    close(popupEdit);
};
formAdd.addEventListener('submit', handleAddFormSubmit);
formEdit.addEventListener('submit', handleEditFormSubmit);

/* popupEdit.addEventListener('click', (evt) => {
    if (evt.target === popupEdit) {
        close(popupEdit);
    }
});
popupAdd.addEventListener('click', (evt) => {
    if (evt.target === popupAdd) {
        close(popupAdd);
    }
});
popupImage.addEventListener('click', (evt) => {
    if (evt.target === popupImage) {
        close(popupImage);
    }
}); */
addButton.addEventListener('click', () => {
    imgTitle.value = '';
    image.value = '';
    open(popupAdd);
});
editButton.addEventListener('click', () => {
    const userInfo = getUserInfo();
    person.value = userInfo.profileName.textContent;
    job.value = userInfo.profileOccupation.textContent;
    open(popupEdit);
});