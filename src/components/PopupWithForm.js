import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupElement, handleFormSubmit }) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".form")
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelector(".form__item");
        this._formValues = {};

        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        console.log(this._formValues);
        return this._formValues;
    }

    setEventlisteners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues);
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

}