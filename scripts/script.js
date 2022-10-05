let profileEditButton = document.querySelector('.profile__edit-btn');
const profileSubmitButton = document.querySelector('.profile__submit-btn');
let popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupPlace = document.querySelector('.popup-card');
let formElement = popup.querySelector('.popup__form')
let popupCloseButton = popup.querySelector('.popup__close-btn');
let popupSubmitButton = popup.querySelector ('.popup__submit-btn');
let nameInput = popup.querySelector('.popup__input_el_name');
let jobInput = popup.querySelector('.popup__input_el_job');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
const cards = document.querySelector('.cards');


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

initialCards.forEach(function (element) { 
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true)

    const cardImage = cardElement.querySelector('.cards__image').src = element.link;
    // cardImage.addEventListener('click', function(event){

    // });
    cardElement.querySelector('.cards__title').textContent = element.name;
    cardElement.querySelector('.cards__like').addEventListener('click', function(event){
      event.target.classList.toggle('cards__like_active');
    });
    cardElement.querySelector('.cards__delite').addEventListener('click', function(event){
      event.target.closest('.cards__item').remove();
    });
    cards.append(cardElement);
});





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

// profileSubmitButton.addEventListener('click', function() {
//   popupPlace.classList.toggle('popup__opened');
// });


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
    popupClose();
}
formElement.addEventListener('submit', formSubmitHandler);