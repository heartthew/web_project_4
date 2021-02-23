const popupImage = document.querySelector(".popup_type_image");

const escHandler = (evt) => {
    const currentPopup = document.querySelector(".popup_opened");
    if (evt.key === 'Escape') {
        closePopup(currentPopup);
    }
};

const openPopup = (popup) => {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', escHandler);
};

const closePopup = (popup) => {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', escHandler);
};
export { escHandler, openPopup, closePopup, popupImage };