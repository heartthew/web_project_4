let profileInfo = document.querySelector(".profile__info");
let editButton = document.querySelector(".profile__edit-button");
let form = document.querySelector(".form");
let person = form.querySelector(".form__item_input_name");
let job = form.querySelector(".form__item_input_job");
let closeIcon = document.querySelector(".popup__close-icon");
let profileName = profileInfo.querySelector(".profile__name");
let profileOccupation = profileInfo.querySelector(".profile__occupation");

function openForm() {
    let newName = document.querySelector(".form__item_input_name").value
    newName = profileName.textContent;
    let newJob = document.querySelector(".form__item_input_job").value
    newJob = profileOccupation.textContent;
    let opened = document.querySelector(".popup");
    opened.classList.add("popup_opened");
}

function closeForm() {
    let closed = document.querySelector(".popup");
    closed.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = person.value;
    profileOccupation.textContent = job.value;
    closeForm();
}

editButton.addEventListener("click", openForm);
closeIcon.addEventListener("click", closeForm);
form.addEventListener('submit', handleFormSubmit);