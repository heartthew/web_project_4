// Wrappers
const popupImg = document.querySelector(".popup_type_image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const element = document.querySelector(".element");
const elements = document.querySelector('.elements');
const formAdd = document.querySelector(".form_add");
const formEdit = document.querySelector(".form_edit");
const popup = document.querySelector(".popup");
const popupOverlay = document.querySelector(".popup__container");
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
const fullTitle = popupImg.querySelector(".popup__title");
const fullImage = popupImg.querySelector(".popup__image");

function escHandler(evt) {
    const currentPopup = document.querySelector(".popup_opened");
    if (evt.key === 'Escape') {
        closePopup(currentPopup);
    }
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keyup', escHandler);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keyup', escHandler);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = person.value;
    profileOccupation.textContent = job.value;
    closePopup(popupEdit);
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
        fullImage.src = data.link;
        fullTitle.textContent = data.name;
        openPopup(popupImg);
    });

    return cardElement;
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    newData.name = imgTitle.value;
    newData.link = image.value;
    const newElement = createCard(newData);
    elements.prepend(newElement);
    closePopup(popupAdd);
}

initialCards.forEach((data) => {
    const cardElement = createCard(data);
    elements.prepend(cardElement);
});

popupImg.addEventListener("click", (evt) => {
    if (evt.target === popupImg) {
        closePopup(popupImg);
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
    closePopup(popupImg);
});

formAdd.addEventListener("submit", handleAddFormSubmit);
formEdit.addEventListener("submit", handleEditFormSubmit);