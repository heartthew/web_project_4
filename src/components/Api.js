export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(this._baseUrl + "/cards", {
                headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    getUserInfo() {
        return fetch(this._baseUrl + "/users/me", {
                headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    setUserInfo({ name, about }) {
        return fetch(this._baseUrl + "/users/me", {
                headers: this._headers,
                method: "PATCH",
                body: JSON.stringify({
                    name,
                    about
                })
            })
            .then(res => res.ok ? res.json() : Promise.reject("Error   " + res.statusText))
            .catch(err => console.log(err))
    }

    setAvatar(avatar) {
        return fetch(this._baseUrl + "/users/me/avatar", {
                headers: this._headers,
                method: "PATCH",
                body: JSON.stringify({
                    avatar
                })
            })
            .then(res => res.ok ? res.json() : Promise.reject("Error   " + res.statusText))
            .catch(err => console.log(err))
    }

    addCard({ name, link }) {
        return fetch(this._baseUrl + "/cards", {
                headers: this._headers,
                method: "POST",
                body: JSON.stringify({
                    name,
                    link
                })
            })
            .then(res => res.ok ? res.json() : Promise.reject("Error   " + res.statusText))
            .catch(err => console.log(err))
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + "/cards/" + cardId, {
                headers: this._headers,
                method: "DELETE",
            })
            .then(res => res.ok ? res.json() : Promise.reject("Error   " + res.statusText))
            .catch(err => console.log(err))
    }

    addLike(cardId) {
        return fetch(this._baseUrl + "/cards/likes/" + cardId, {
                method: "PUT",
                headers: this._headers
            })
            .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)));
    }

    removeLike(cardId) {
        return fetch(this._baseUrl + "/cards/likes/" + cardId, {
                method: "DELETE",
                headers: this._headers
            })
            .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)));
    }
}