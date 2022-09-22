let popupOpenButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-btn');
let submitButton = popup.querySelector ('.popup__submit-btn');
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_job');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
nameInput.setAttribute('placeholder', profileTitle.textContent);
jobInput.setAttribute('placeholder', profileDescription.textContent);
nameInput.value = '';
jobInput.value = '';

let popupToggle = function() {
    popup.classList.toggle('popup__opened');
    nameInput.value = '';
    jobInput.value = '';
}
popupOpenButton.addEventListener('click', popupToggle);


popupCloseButton.addEventListener('click', popupToggle);


let popupRemoveByOverlay = function(event) {
    if (event.target == event.currentTarget){
        popupToggle();
    }
}
popup.addEventListener('click', popupRemoveByOverlay);


function formSubmitHandler(evt) {
    evt.preventDefault();
    if (nameInput.value != '') {
        profileTitle.textContent = nameInput.value;
    }
    if (jobInput.value != '') {
        profileDescription.textContent = jobInput.value;
    }
    nameInput.setAttribute('placeholder', profileTitle.textContent);
    jobInput.setAttribute('placeholder', profileDescription.textContent);
    nameInput.value = '';
    jobInput.value = '';
    popupToggle();
}
submitButton.addEventListener('click', formSubmitHandler);