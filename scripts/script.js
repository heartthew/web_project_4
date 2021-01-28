// Wrappers
const popupImg = document.querySelector(".popup_type_image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const element = document.querySelector(".element");
const elements = document.querySelector('.elements');
const formAdd = document.querySelector(".form_add");
const formEdit = document.querySelector(".form_edit");
const popup = document.querySelector(".popup");
const profileInfo = document.querySelector(".profile__info");

// Open Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
// const likeButton = element.querySelector(".element__like-button");

// Close Buttons
const closeAdd = document.querySelector(".popup__add_close-button");
const closeEdit = document.querySelector(".popup__edit_close-button");
const closeImg = document.querySelector(".popup__full_close-button");

const cardTemplate = document.querySelector(".element-template").content.querySelector(".element");

let person = formEdit.querySelector(".form__item_input_name");
let job = formEdit.querySelector(".form__item_input_job");
let newData = [{
    name: "",
    link: ""
}, ];
let imgTitle = formAdd.querySelector(".form__item_input_title");
let image = formAdd.querySelector(".form__item_input_image");
let profileName = profileInfo.querySelector(".profile__name");
let profileOccupation = profileInfo.querySelector(".profile__occupation");

function togglePopup(popup) {
    popup.classList.toggle("popup_opened");
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = person.value;
    profileOccupation.textContent = job.value;
    togglePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newElement = cardTemplate.cloneNode(true);
    const newImage = newElement.querySelector(".element__image");
    const newTitle = newElement.querySelector(".element__title");
    const newLikeButton = newElement.querySelector(".element__like-button");
    const newTrashButton = newElement.querySelector(".element__trash-button");

    newData.name = imgTitle.value;
    newData.link = image.value;

    newTitle.textContent = newData.name;
    newImage.style.backgroundImage = `url(${newData.link})`;
    newTitle.textContent = newData.name;
    newImage.src = newData.link;

    newLikeButton.addEventListener('click', () => {
        newLikeButton.classList.toggle("element__like-button_active");
        newLikeButton.classList.toggle("element__like-button");
    });

    newTrashButton.addEventListener('click', () => {
        const listItem = newTrashButton.closest(".element");
        listItem.remove();
    });

    newImage.addEventListener('click', () => {
        const newTitle = popupImg.querySelector(".popup__title");
        const newImage = popupImg.querySelector(".popup__image");
        newImage.src = newData.link;
        newTitle.textContent = newData.name;
        togglePopup(popupImg);
    });

    elements.prepend(newElement);
    togglePopup(popupAdd);
}

const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

initialCards.forEach((data) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".element__image");
    const cardTitle = cardElement.querySelector(".element__title");
    const cardLikeButton = cardElement.querySelector(".element__like-button");
    const cardTrashButton = cardElement.querySelector(".element__trash-button");

    cardTitle.textContent = data.name;
    cardImage.style.backgroundImage = `url(${data.link})`;

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle("element__like-button_active");
        cardLikeButton.classList.toggle("element__like-button");
    });

    cardTrashButton.addEventListener('click', () => {
        const listItem = cardTrashButton.closest(".element");
        listItem.remove();
    });

    cardImage.addEventListener('click', () => {
        const cardTitle = popupImg.querySelector(".popup__title");
        const cardImage = popupImg.querySelector(".popup__image");
        cardImage.src = data.link;
        cardTitle.textContent = data.name;
        togglePopup(popupImg);
    });

    elements.prepend(cardElement);
});

addButton.addEventListener("click", () => {
    imgTitle.value = "";
    image.value = "";
    togglePopup(popupAdd);
});


editButton.addEventListener("click", () => {
    person.value = profileName.textContent;
    job.value = profileOccupation.textContent;
    togglePopup(popupEdit);
});

closeAdd.addEventListener("click", () => {
    togglePopup(popupAdd);
});

closeEdit.addEventListener("click", () => {
    togglePopup(popupEdit);
});

closeImg.addEventListener("click", () => {
    togglePopup(popupImg);
});

formAdd.addEventListener("submit", handleAddFormSubmit);
formEdit.addEventListener("submit", handleEditFormSubmit);