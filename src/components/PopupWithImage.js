import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, caption) {
        this._popupElement.querySelector(".popup__image").src = link;
        this._popupElement.querySelector(".popup__title").src = caption;
        super.open();
    }
}