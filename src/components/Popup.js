export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close-button') || !evt.target == ('popup_opened')) {
                this.close();
            }
        });
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        });
    }
}

/* popupEdit.addEventListener('click', (evt) => {
    if (evt.target === popupEdit) {
        popupEdit.close();
    }
});
popupAdd.addEventListener('click', (evt) => {
    if (evt.target === popupAdd) {
        popupAdd.close();
    }
});
popupImage.addEventListener('click', (evt) => {
    if (evt.target === popupImage) {
        popupImage.close();
    }
}); */