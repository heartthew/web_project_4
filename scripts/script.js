let profileInfo = document.querySelector(".profile__info");
let editButton = document.querySelector(".profile__edit-button");
let form = document.querySelector(".form");
let person = form.querySelector(".form__item_input_name");
let job = form.querySelector(".form__item_input_job");
let closeIcon = document.querySelector(".popup__close-icon");
let profileName = profileInfo.querySelector(".profile__name");
let profileOccupation = profileInfo.querySelector(".profile__occupation");
let toggle = document.querySelector(".popup");

function openForm() {
    person.value = profileName.textContent;
    job.value = profileOccupation.textContent;
    toggle.classList.add("popup_opened");
}

function closeForm() {
    toggle.classList.remove("popup_opened");
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