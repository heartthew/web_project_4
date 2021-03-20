import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupElement, handleFormSubmit }) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".form");
    }

    _getInputValues() {
        this._inputList = Array.from(this._form.querySelectorAll(".form__item"));
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        console.log("formvalues", this._formValues);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}