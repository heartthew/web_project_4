export default class UserInfo {
    constructor({ person, job }) {
        this._person = person;
        this._job = job;
        this._name = document.querySelector("profile__name");
        this._description = document.querySelector("profile__occupation");
    }

    getUserInfo() {
        return { name: this._name.innerText, description: this._description.innerText };

    }

    setUserInfo(person, job) {
        this._name.textContent = person;
        this._description.textContent = job;
    }

}

/* 
_getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".form__item");
    this._formValues = {};

    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
    });
    return this._formValues;
} */