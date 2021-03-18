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
// New Card
const newData = [{
    name: "",
    link: ""
}, ];
// User Info
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

const userInfo = new UserInfo({
    person: profileName,
    job: profileOccupation
});

// Validators
const editFormValidator = new FormValidator(defaultConfig, formEdit);
const addFormValidator = new FormValidator(defaultConfig, formAdd);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Initialize
const cards = new Section({
        items: startCards,
        renderer: (cardItem) => {
            const card = new Card({
                    data: cardItem,
                    handleCardClick: () => {
                        fullImage.src = cardItem.link;
                        fullImage.alt = cardItem.name;
                        fullTitle.textContent = cardItem.name;
                        popupImage.open(cardItem.link, cardItem.name);
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
        console.log("data", data);
        userInfo.setUserInfo(userInfo.person, userInfo.job);
        popupEdit.close();
    }
});

const popupAdd = new PopupWithForm({
    popupElement: '.popup_type_add',
    handleFormSubmit: (newData) => {
        const newCard = new Card({
                data: newData,
                handleCardClick: () => {
                    fullImage.src = cardItem.link;
                    fullImage.alt = cardItem.name;
                    fullTitle.textContent = cardItem.name;
                    popupImage.open(cardItem.link, cardItem.name);
                }
            },
            elements);
        console.log("data", newData);
        const cardElement = newCard.createCard();
        cards.addItem(cardElement);
        popupAdd.close();
    }
});

const popupImage = new PopupWithImage('.popup_type_image');
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

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