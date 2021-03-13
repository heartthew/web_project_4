import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupElement, handleFormSubmit) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll(".form__item");
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventlisteners() {
        super.setEventListeners();
        this._popupElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        this.reset(); // ._form?
        super.close();
    }

}