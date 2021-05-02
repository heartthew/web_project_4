import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupElement, handleFormSubmit }) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".form");
        this._submit = this._form.querySelector(".form__submit");
        this._inputList = Array.from(this._form.querySelectorAll(".form__item"));
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    open() {
        super.open();
        this._form.reset();
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submit.textContent = "Saving...";
            this._handleFormSubmit(this._getInputValues())
                .then(() => {
                    this._submit.textContent = this._submit.value;
                })
                .catch((err) => console.log(err));
        });
        super.setEventListeners();
    }
}