import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { startCards } from '../initialize.js';
import { defaultConfig } from '../utils.js';
import './index.css';

// Wrappers
const elements = document.querySelector('.elements');
// Open Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// Image Containers
let fullTitle = document.querySelector(".popup__title");
let fullImage = document.querySelector(".popup__image");
// Forms
const formAdd = document.querySelector('.form_add');
const formEdit = document.querySelector('.form_edit');
// Inputs
const person = formEdit.querySelector(".form__item_input_name");
const job = formEdit.querySelector(".form__item_input_job");
const imgTitle = formAdd.querySelector('.form__item_input_title');
const image = formAdd.querySelector('.form__item_input_image');

// User Info
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
let userInfo = new UserInfo({
    profileName: profileName.textContent,
    profileJob: profileOccupation.textContent
});
console.log("userInfo", userInfo);

// Enable Validators
const editFormValidator = new FormValidator(defaultConfig, formEdit);
const addFormValidator = new FormValidator(defaultConfig, formAdd);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Initialize Cards
const cards = new Section({
        items: startCards,
        renderer: (cardItem) => {
            const card = new Card({
                    data: cardItem,
                    handleCardClick: (name, link) => {
                        fullTitle.textContent = cardItem.name;
                        popupImage.open(link, name);
                    }
                },
                elements)
            const cardElement = card.createCard();
            cards.addItem(cardElement);
        }
    },
    ".elements"
);
cards.renderItems();

// Popups
const popupEdit = new PopupWithForm({
    popupElement: '.popup_type_edit',
    handleFormSubmit: (data) => {
        let newUser = new UserInfo({
            profileName: data.person,
            profileJob: data.job
        })
        userInfo.setUserInfo(data.person, data.job);
        console.log("setUserdata", userInfo);
        popupEdit.close();
    }
});
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm({
    popupElement: '.popup_type_add',
    handleFormSubmit: (newData) => {
        const newCard = new Card({
                data: newData,
                handleCardClick: (name, link) => {
                    fullTitle.textContent = newData.name;
                    popupImage.open(link, name);
                }
            },
            elements)
        const newCardElement = newCard.createCard();
        cards.addItem(newCardElement);
        popupAdd.close();
    }
});
popupAdd.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Prepare Forms When Clicked
addButton.addEventListener('click', () => {
    imgTitle.value = '';
    image.value = '';
    popupAdd.open();
});
editButton.addEventListener('click', () => {
    person.value = profileName.textContent;
    job.value = profileOccupation.textContent;
    popupEdit.open();
});