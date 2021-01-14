let profileInfo = document.querySelector(".profile-info");
let editButton = document.querySelector(".edit-button");
let form = document.querySelector(".form");
let person = form.querySelector(".form__item_name");
let job = form.querySelector(".form__item_job");
let closeIcon = form.querySelector(".form__close-icon");
let profileInfoName = profileInfo.querySelector(".profile-info__name");
let profileInfoOccupation = profileInfo.querySelector(".profile-info__occupation");

function openForm() {
    document.getElementById("name").value = profileInfoName.textContent;
    document.getElementById("job").value = profileInfoOccupation.textContent;
    let opened = document.querySelector(".popup");
    opened.classList.add("popup_opened");
}

function closeForm() {
    let closed = document.querySelector(".popup");
    closed.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileInfoName.textContent = person.value;
    profileInfoOccupation.textContent = job.value;
    closeForm();
}

editButton.addEventListener("click", openForm);
closeIcon.addEventListener("click", closeForm);
form.addEventListener('submit', handleFormSubmit);