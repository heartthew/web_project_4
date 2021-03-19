export default class UserInfo {
    constructor({ profileName, profileJob }) {
        this._person = profileName.value;
        this._job = profileJob.value;
    }

    getUserInfo() {
        console.log("getUserData", this._person, this._name);
        return { person: this._name.innerText, job: this._occupation.innerText };
    }

    setUserInfo(newUser, newJob) {
        this._person = newUser;
        this._job = newJob;
        profileName.textContent = newUser.value;
        profileOccupation.textContent = newJob.value;
    }
}