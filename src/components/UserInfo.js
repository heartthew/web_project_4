export default class UserInfo {
    constructor({ personSelector, jobSelector }) {
        this._person = personSelector;
        this._job = jobSelector;
        this._name = document.querySelector(this._person);
        this._occupation = document.querySelector(this._job);
    }

    getUserInfo() {
        return { name: this._name.innerText, occupation: this._occupation.innerText };
    }

    setUserInfo(newUser, newJob) {
        this._name.innerText = newUser;
        this._occupation.innerText = newJob;
    }
}