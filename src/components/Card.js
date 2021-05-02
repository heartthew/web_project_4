export default class Card {
    constructor({ data, handleCardClick, handleDeleteClick }, template, api) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._owner = data.owner;
        this._api = api;
    }

    findId() {
        return this._id;
    }

    _handleLike() {
        const likeButton = this._card.querySelector(".element__like-button");
        likeButton.classList.toggle("element__like-button_active");
    }

    _tallyLikes() {
        const likeTally = this._card.querySelector(".element__like-tally");
        likeTally.textContent = this._likes.length
    }

    _ownerLike(userId) {
        const owner = this._likes.find(like => like._id === userId);
        return owner;
    }

    handleTrash() {
        this._card.remove();
        this._card = null;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._template).content.querySelector(".element");
        return cardTemplate;
    }

    _setEventListeners(userId) {
        const trashButton = this._card.querySelector(".element__trash-button");
        if (userId === this._ownerId) {
            trashButton.addEventListener('click', () => {
                this._handleDeleteClick(this.id);
            })
        } else {
            trashButton.classList.add("element__hidden");
        };

        const likeButton = this._card.querySelector(".element__like-button");
        likeButton.addEventListener("click", () => {
            if (this._ownerLike(userId)) {
                this._api.removeLike(this._id)
                    .then((res) => {
                        this._likes = res.likes;
                        this._handleLike();
                        this._tallyLikes();
                    })
                    .catch((err) => console.log(err));
            } else {
                this._api.addLike(this._id)
                    .then((res) => {
                        this._likes = res.likes;
                        this._handleLike();
                        this._tallyLikes();
                    })
                    .catch((err) => console.log(err));
            };
        });

        this._card.querySelector(".element__image")
            .addEventListener('click', () => this._handleCardClick(this._link, this._name));
    }

    createCard(userId) {
        this._card = this._getTemplate().cloneNode(true);
        const cardImage = this._card.querySelector(".element__image");
        const cardTitle = this._card.querySelector(".element__title");

        cardTitle.textContent = this._name;
        cardImage.style.backgroundImage = `url(${this._link})`;
        cardImage.alt = this._name;

        if (this._ownerLike(userId)) {
            this._handleLike();
        }
        this._setEventListeners(userId);
        this._tallyLikes();
        return this._card;
    }
}