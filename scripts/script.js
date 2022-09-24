let profileEditButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form')
let popupCloseButton = popup.querySelector('.popup__close-btn');
let popupSubmitButton = popup.querySelector ('.popup__submit-btn');
let nameInput = popup.querySelector('.popup__input_el_name');
let jobInput = popup.querySelector('.popup__input_el_job');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

let popupOpen = function() {
    popup.classList.add('popup__opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}
profileEditButton.addEventListener('click', popupOpen);

let popupClose = function() {
    popup.classList.remove('popup__opened');
}
popupCloseButton.addEventListener('click', popupClose);


// let popupRemoveByOverlay = function(event) {
//     if (event.target == event.currentTarget){
//         popupToggle();
//     }
// }
// popup.addEventListener('click', popupRemoveByOverlay);


function formSubmitHandler(evt) {
    evt.preventDefault();
    if (nameInput.value != '') {
        profileTitle.textContent = nameInput.value;
    }
    if (jobInput.value != '') {
        profileDescription.textContent = jobInput.value;
    }
    // nameInput.setAttribute('placeholder', profileTitle.textContent);
    // jobInput.setAttribute('placeholder', profileDescription.textContent);
    popupClose();
}
formElement.addEventListener('submit', formSubmitHandler);