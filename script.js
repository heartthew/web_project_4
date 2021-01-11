let profileInfo = document.querySelector(".profile-info");
let editButton = profileInfo.querySelector(".profile-info__edit-button");
let form = document.querySelector(".form");
let person = form.querySelector(".form__item_name");
let job = form.querySelector(".form__item_job");
let closeIcon = form.querySelector(".form__close-icon");
let profileInfoName = profileInfo.querySelector(".profile-info__name");
let profileInfoOccupation = profileInfo.querySelector(".profile-info__occupation");

person.setAttribute("value", profileInfoName.textContent);
job.setAttribute("value", profileInfoOccupation.textContent);

function openForm() {
    let opened = document.querySelector(".popup");
    opened.classList.add("popup_opened");
}

function closeForm() {
    let closed = document.querySelector(".popup");
    closed.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileInfoName.textContent = `${person.value}`;
    profileInfoOccupation.textContent = `${job.value}`;
    closeForm();
}

editButton.addEventListener("click", openForm);
closeIcon.addEventListener("click", closeForm);
form.addEventListener('submit', handleFormSubmit);