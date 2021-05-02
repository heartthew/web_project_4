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
    person,
    job
} from "../utils/constants.js";
import "./index.css";

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

Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
    ])
    .then(([person, places]) => {
        userInfo.setUserInfo(person.name, person.about, person._id);
        userInfo.setAvatar(person.avatar);
        const cards = new Section({
            items: places,
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
    })
    .catch((err) => console.log("err", err));



const popupEdit = new PopupWithForm({
    popupElement: ".popup_type_edit",
    handleFormSubmit: (newUser) => {
        return api.setUserInfo({ name: newUser.user, about: newUser.job })
            .then(newUser => {
                userInfo.setUserInfo(newUser.name, newUser.about, newUser._id);
                popupEdit.close();
            })
            .catch((err) => console.log("err", err));
    }
});

popupEdit.setEventListeners();
editButton.addEventListener("click", () => {
    const fillUser = userInfo.getUserInfo();
    popupEdit.open();
    person.value = fillUser.name;
    job.value = fillUser.about;
});

const popupAvatar = new PopupWithForm({
    popupElement: ".popup_type_avatar",
    handleFormSubmit: (imageLink) => {
        return api.setAvatar(imageLink.link)
            .then((res) => {
                userInfo.setAvatar(res.avatar);
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
popupImage.setEventListeners();
popupConfirm.setEventListeners();

// Enable Validators
const editFormValidator = new FormValidator(defaultConfig, formEdit);
const addFormValidator = new FormValidator(defaultConfig, formAdd);
const avatarFormValidator = new FormValidator(defaultConfig, formAvatar);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();