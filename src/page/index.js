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

// Popups
const popupEdit = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
const popupAdd = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
const popupImage = new PopupWithImage('.popup_type_image');
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    newData.name = imgTitle.value;
    newData.link = image.value;
    const cardElement = newData.createCard();
    cards.addItem(cardElement);
    popupAdd.close();
};
const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    userInfo.person = person.value;
    userInfo.job = job.value;
    userInfo.setUserInfo(userInfo.person, userInfo.job);
    popupEdit.close();
};

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

formAdd.addEventListener('submit', handleAddFormSubmit);
formEdit.addEventListener('submit', handleEditFormSubmit);

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