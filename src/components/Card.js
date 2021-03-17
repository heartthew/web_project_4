import PopupWithImage from "./PopupWithImage.js";
import Popup from "./Popup.js";

export default class Card {
    constructor({ data, handleCardClick }, template) {
        this._link = data.link;
        this._name = data.name;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _handleLike() {
        const cardLikeButton = this._card.querySelector(".element__like-button");
        cardLikeButton.classList.toggle("element__like-button_active");
    }

    _handleTrash() {
        this._card.remove();
        this._card = null;
    }

    _getCardTemplate() {
        this._cardTemplate = document.querySelector(".element-template").content.querySelector(".element");
        return this._cardTemplate;
    }

    _setEventListeners() {
        const cardLikeButton = this._card.querySelector(".element__like-button");
        const cardTrashButton = this._card.querySelector(".element__trash-button");
        const cardImage = this._card.querySelector(".element__image");

        cardLikeButton.addEventListener('click', () => this._handleLike());
        cardTrashButton.addEventListener('click', () => this._handleTrash());
        cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
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