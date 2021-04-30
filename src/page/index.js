import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import {
    defaultConfig,
    editButton,
    addButton,
    avatarButton,
    formAdd,
    formEdit,
    formAvatar,
    formConfirm,
    person,
    job,
    avatar
} from "../utils.js";
import "./index.css";

function makeCard(items) {
    const card = new Card({
        data: items,
        handleCardClick: (link, name) => { popupImage.open(link, name) },
        handleDeleteClick: () => {
            popupConfirm.open();
            popupConfirm.handleYes(() => {
                api.deleteCard(card.findId())
                    .then(() => {
                        card.handleTrash();
                        popupConfirm.close();
                    })
                    .catch((err) => console.log(err));
            })
        }
    }, ".element-template", api);
    return card.createCard(userInfo.id);
}

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-7",
    headers: {
        authorization: "cd1cfdf8-4aa7-46c5-9465-44c7c15c403b",
        "Content-Type": "application/json"
    }
});

const userInfo = new UserInfo({
    personSelector: ".profile__name",
    jobSelector: ".profile__occupation",
    avatarSelector: ".profile__avatar"
});

api.getUserInfo()
    .then((res) => {
        userInfo.setUserInfo(res.name, res.about, res._id);
        userInfo.setAvatar(res.avatar);
    })
    .catch((err) => console.log("err", err));

api.getInitialCards()
    .then(res => {
        const cards = new Section({
            items: res,
            renderer: (cardItem) => {
                cards.addItem(makeCard(cardItem));
            }
        }, ".elements");
        cards.renderItems();
        const popupAdd = new PopupWithForm({
            popupElement: ".popup_type_add",
            handleFormSubmit: (newData) => {
                return api.addCard(newData)
                    .then((newData) => {
                        const card = makeCard(newData);
                        cards.prependItem(card);
                        popupAdd.close();
                    });
            }
        });
        popupAdd.setEventListeners();
        addButton.addEventListener("click", () => {
            popupAdd.open();
        });
        popupImage.setEventListeners();
    });


const popupEdit = new PopupWithForm({
    popupElement: ".popup_type_edit",
    handleFormSubmit: (newUser) => {
        return api.setUserInfo({ name: newUser.user, about: newUser.job })
            .then(newUser => {
                userInfo.setUserInfo(newUser.name, newUser.about);
                popupEdit.close();
            });
    }
});

popupEdit.setEventListeners();
editButton.addEventListener("click", () => {
    const fillUser = userInfo.getUserInfo();
    person.value = fillUser.name;
    job.value = fillUser.about;
    popupEdit.open();
});

const popupAvatar = new PopupWithForm({
    popupElement: ".popup_type_avatar",
    handleFormSubmit: (imageLink) => {
        return api.setAvatar(imageLink.link)
            .then((res) => {
                avatar.src = res.avatar;
                popupAvatar.close();
            })
            .catch((err) => console.log("err", err));
    }
});
popupAvatar.setEventListeners();
avatarButton.addEventListener("click", () => {
    popupAvatar.open();
});

const popupImage = new PopupWithImage(".popup_type_image");
const popupConfirm = new PopupConfirm(".popup_type_confirm");
popupConfirm.setEventListeners();

// Enable Validators
const editFormValidator = new FormValidator(defaultConfig, formEdit);
const addFormValidator = new FormValidator(defaultConfig, formAdd);
const avatarFormValidator = new FormValidator(defaultConfig, formAvatar);
const confirmFormValidator = new FormValidator(defaultConfig, formConfirm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
confirmFormValidator.enableValidation();