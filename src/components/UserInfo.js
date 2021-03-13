export default class UserInfo {
    constructor({ data }) { // profile name n job
        this._username = data.person; // rename suffix accordingly
        this._userjob = data.job; // rename suffix accordingly
    }

    getUserInfo() {
        const user = {
            profileName: document.querySelector('.profile__name'),
            profileOccupation: document.querySelector('.profile__occupation')
        }
        return user;
    }

    setUserInfo(newUser) {
        const person = formEdit.querySelector('.form__item_input_name');
        const job = formEdit.querySelector('.form__item_input_job');
        newUser.profileName.textContent = person.value;
        newUser.profileOccupation.textContent = job.value;
    }

}

/* const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    newData.name = imgTitle.value;
    newData.link = image.value;
    renderCard(newData, elements);
    close(popupAdd);
}; */

/* 
_getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".form__item");
    this._formValues = {};

    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
    });
    return this._formValues;
} */

/* const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = person.value;
    profileOccupation.textContent = job.value;
    closePopup(popupEdit);
}; */