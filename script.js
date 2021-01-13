let profileInfo = document.querySelector(".profile-info");
let editButton = document.querySelector(".edit-button");
let form = document.querySelector(".form");
let person = form.querySelector(".form__item_name");
let job = form.querySelector(".form__item_job");
let closeIcon = form.querySelector(".form__close-icon");
let profileInfoName = profileInfo.querySelector(".profile-info__name");
let profileInfoOccupation = profileInfo.querySelector(".profile-info__occupation");

console.log('0', `${person.value}`, `${job.value}`);

person.setAttribute("value", profileInfoName.textContent);
job.setAttribute("value", profileInfoOccupation.textContent);

console.log('1', `${person.value}`, `${job.value}`);

function openForm() {
    let person = profileInfo.querySelector(".profile-info__name").textContent;
    let job = profileInfo.querySelector(".profile-info__occupation").textContent;
    person.setAttribute("value", profileInfoName.textContent);
    job.setAttribute("value", profileInfoOccupation.textContent);
    console.log('2', person, job, `${person.value}`, `${job.value}`);
    job.textContent = `${job.value}`;
    let opened = document.querySelector(".popup");
    opened.classList.add("popup_opened");
    console.log('3', person, job, person);
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
    console.log('4', person, job, `${person.value}`, `${job.value}`);
}

editButton.addEventListener("click", openForm);
closeIcon.addEventListener("click", closeForm);
form.addEventListener('submit', handleFormSubmit);