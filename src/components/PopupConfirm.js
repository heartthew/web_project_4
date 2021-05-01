import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._button = this._popupElement.querySelector(".form__submit");
    }

    handleYes(confirm) {
        this._confirm = confirm;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._confirm();
        })
    }
}