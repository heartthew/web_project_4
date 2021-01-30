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

// Close Buttons
const closeAdd = document.querySelector(".popup__close-button_type_add");
const closeEdit = document.querySelector(".popup__close-button_type_edit");
const closeImg = document.querySelector(".popup__close-button_type_full");

const cardTemplate = document.querySelector(".element-template").content.querySelector(".element");

const person = formEdit.querySelector(".form__item_input_name");
const job = formEdit.querySelector(".form__item_input_job");
const newData = [{
    name: "",
    link: ""
}, ];
const imgTitle = formAdd.querySelector(".form__item_input_title");
const image = formAdd.querySelector(".form__item_input_image");
const profileName = profileInfo.querySelector(".profile__name");
const profileOccupation = profileInfo.querySelector(".profile__occupation");
const cardTitle = popupImg.querySelector(".popup__title");
const cardImage = popupImg.querySelector(".popup__image");

function togglePopup(popup) {
    popup.classList.toggle("popup_opened");
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = person.value;
    profileOccupation.textContent = job.value;
    togglePopup(popupEdit);
}

function createCard(data) {

    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".element__image");
    const cardTitle = cardElement.querySelector(".element__title");
    const cardLikeButton = cardElement.querySelector(".element__like-button");
    const cardTrashButton = cardElement.querySelector(".element__trash-button");

    cardTitle.textContent = data.name;
    cardImage.style.backgroundImage = `url(${data.link})`;

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle("element__like-button_active");
    });

    cardTrashButton.addEventListener('click', () => {
        const listItem = cardTrashButton.closest(".element");
        listItem.remove();
    });

    cardImage.addEventListener('click', () => {
        cardImage.src = data.link;
        cardTitle.textContent = data.name;
        togglePopup(popupImg);
    });
    return cardElement;
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    newData.name = imgTitle.value;
    newData.link = image.value;
    const newElement = createCard(newData);
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
    const cardElement = createCard(data);
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