import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._fullImage = this._popupElement.querySelector(".popup__image");
        this._fullTitle = this._popupElement.querySelector(".popup__title");

    }

    open(link, caption) {
        this._fullImage.src = link;
        this._fullTitle.textContent = caption;
        super.open();
    }
}