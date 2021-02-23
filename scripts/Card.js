import { popupImage, openPopup } from "./utils.js";

const fullTitle = popupImage.querySelector(".popup__title");
const fullImage = popupImage.querySelector(".popup__image");

class Card {
    constructor(data, template) {
        this._link = data.link;
        this._name = data.name;
        this._template = template;

    }

    _handleImage() {
        fullImage.src = this._link;
        fullImage.alt = this._name;
        fullTitle.textContent = this._name;
        openPopup(popupImage);
    }

    _getCardTemplate() {
        const cardTemplate = document.querySelector(".element-template").content.querySelector(".element");
        return cardTemplate;
    }

    _handleLike() {
        const cardLikeButton = document.querySelector(".element__like-button");
        cardLikeButton.classList.toggle("element__like-button_active");
    }

    _handleTrash() {
        const cardTrashButton = document.querySelector(".element__trash-button");
        const listItem = cardTrashButton.closest(".element");
        listItem.remove();
    }

    _setEventListeners() {
        const cardLikeButton = this._card.querySelector(".element__like-button");
        const cardTrashButton = this._card.querySelector(".element__trash-button");
        const cardImage = this._card.querySelector(".element__image");

        cardLikeButton.addEventListener('click', this._handleLike);
        cardTrashButton.addEventListener('click', this._handleTrash);
        cardImage.addEventListener('click', this._handleImage);
    }

    createCard() {
        this._card = this._getCardTemplate().cloneNode(true);

        const cardImage = this._card.querySelector(".element__image");
        const cardTitle = this._card.querySelector(".element__title");

        cardTitle.textContent = this._name;
        cardImage.style.backgroundImage = `url(${this._link})`;
        cardImage.alt = this._name;

        this._setEventListeners();

        return this._card;
    }
}

export default Card;