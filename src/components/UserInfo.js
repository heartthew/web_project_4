export default class UserInfo {
    constructor({ personSelector, jobSelector, avatarSelector }) {
        this._name = document.querySelector(personSelector);
        this._about = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    setUserInfo(user, job, id) {
        this._name.textContent = user;
        this._about.textContent = job;
        this.id = id;
    }

    setAvatar(avatar) {
        this._avatar.src = avatar;
    }
}