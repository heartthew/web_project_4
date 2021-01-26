// Wrappers
const popupImg = document.querySelector(".popup_type_image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const element = document.querySelector(".element");
const elements = document.querySelector('.elements');
const formAdd = document.querySelector(".form_add");
const formEdit = document.querySelector(".form_edit");
const popup = document.querySelector(".popup");

// Open Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
// Close Buttons
const closeAdd = addButton.querySelector(".popup__close-icon");
const closeEdit = editButton.querySelector(".popup__close-icon");
const closeIcon = document.querySelector(".popup__close-icon");

const profileInfo = document.querySelector(".profile__info");
const cardTemplate = document.querySelector(".element-template").content.querySelector(".element");

let person = formEdit.querySelector(".form__item_input_name");
let job = formEdit.querySelector(".form__item_input_job");
let imgTitle = formAdd.querySelector(".form__item_input_title");
let image = formAdd.querySelector(".form__item_input_image");
let profileName = profileInfo.querySelector(".profile__name");
let profileOccupation = profileInfo.querySelector(".profile__occupation");
//let fullSizeImage = element.querySelector(".element__image");

const likeButton = document.querySelector(".element__like-button");


function showFull() {
    togglePopup(popupImg);
}

function togglePopup(popup) {
    popup.classList.toggle("popup_opened");
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = person.value;
    profileOccupation.textContent = job.value;
    togglePopup(popupEdit);
}
// fullSizeImage.addEventListener("click", showFull);
function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newData = [{
        name: "",
        link: ""
    }, ];
    const newElement = cardTemplate.cloneNode(true);
    const placeImage = newElement.querySelector(".element__image");
    const placeTitle = newElement.querySelector(".element__title");
    const newLikeButton = newElement.querySelector(".element__like-button");
    const newTrashButton = newElement.querySelector(".element__trash-icon");


    newData.name = imgTitle.value;
    //newData.link = image.url;
    placeTitle.textContent = newData.name;
    placeImage.style.backgroundImage = `url(${newData.link})`;
    placeTitle.textContent = newData.name;
    placeImage.src = newData.link;
    elements.prepend(newData);
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
    const cardTrashButton = cardElement.querySelector(".element__trash-icon");

    cardTitle.textContent = data.name;
    cardImage.style.backgroundImage = `url(${data.link})`;

    cardLikeButton.addEventListener('click', () => {
        likeButton.classList.toggle(".element__like-button");
        likeButton.classList.toggle(".element__like-button_active");
    });

    //         cardTrashButton.addEventListener('click' () => {});

    cardImage.addEventListener('click', () => {
        const placeTitle = document.querySelector(".element__title");
        const placeImage = document.querySelector(".element__image");
        placeImage.src = data.link;
        placeTitle.textContent = data.name;
        togglePopup(popupImg);
    });


    elements.prepend(cardElement);
});

addButton.addEventListener("click", () => {
    imgTitle.textContent = null;
    image = null;
    togglePopup(popupAdd);

});


editButton.addEventListener("click", () => {
    person.value = profileName.textContent;
    job.value = profileOccupation.textContent;
    togglePopup(popupEdit);
});
closeIcon.addEventListener("click", togglePopup);
formAdd.addEventListener("submit", handleAddFormSubmit);
formEdit.addEventListener("submit", handleEditFormSubmit);