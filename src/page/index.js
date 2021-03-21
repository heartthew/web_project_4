import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { startCards } from '../initialize.js';
import { defaultConfig } from '../utils.js';
import './index.css';

// Open Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// Forms
const formAdd = document.querySelector('.form_add');
const formEdit = document.querySelector('.form_edit');
// Inputs
const person = formEdit.querySelector(".form__item_input_name");
const job = formEdit.querySelector(".form__item_input_job");

// User Info
const userInfo = new UserInfo({
    personSelector: ".profile__name",
    jobSelector: ".profile__occupation"
});

// Enable Validators
const editFormValidator = new FormValidator(defaultConfig, formEdit);
const addFormValidator = new FormValidator(defaultConfig, formAdd);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Create Cards
function makeCard(items) {
    const card = new Card({
        data: items,
        handleCardClick: (name, link) => {
            popupImage.open(link, name);
        }
    }, ".element-template");
    return card.createCard()
}

// Initialize Cards
const cards = new Section({
    items: startCards,
    renderer: (cardItem) => {
        cards.addItem(makeCard(cardItem));
    }
}, ".elements");
cards.renderItems();

// Popups
const popupEdit = new PopupWithForm({
    popupElement: '.popup_type_edit',
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data.person, data.job);
        popupEdit.close();
    }
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
    popupElement: '.popup_type_add',
    handleFormSubmit: (newData) => {
        cards.prependItem(makeCard(newData));
        popupAdd.close();
    }
});
popupAdd.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Prepare Forms When Clicked
addButton.addEventListener('click', () => {
    popupAdd.open();
});

editButton.addEventListener('click', () => {
    const fillUser = userInfo.getUserInfo();
    person.value = fillUser.name;
    job.value = fillUser.occupation;
    popupEdit.open();
});