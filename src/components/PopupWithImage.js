import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._fullImage = this._popupElement.querySelector(".popup__image");
        this._fullTitle = this._popupElement.querySelector(".popup__title");

    }

    open(link, name) {
        this._fullImage.src = link;
        this._fullTitle.textContent = name;
        super.open();
    }
}