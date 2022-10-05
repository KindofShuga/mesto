const profileEditButton = document.querySelector('.profile__edit-btn');
const profileSubmitButton = document.querySelector('.profile__submit-btn');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const popupProfile = document.querySelector('.popup-profile');
const nameInput = popupProfile.querySelector('.popup__input_el_name');
const jobInput = popupProfile.querySelector('.popup__input_el_job');
const popupProfileFormElement = popupProfile.querySelector('.popup__form');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-btn');

const popupPlace = document.querySelector('.popup-card');
const popupPlaceFormElement = popupPlace.querySelector('.popup__form');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-btn');

const popupImage = document.querySelector('.popup-image');

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

const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#cards-template');


const setListeners = (currentCard) => {
  currentCard.querySelector('.cards__image').addEventListener('click', function(event){
    popupOpen(popupImage);
    const currentItem = event.target.closest('.cards__item');
    popupImage.querySelector('.popup-image__image').src = currentItem.querySelector('.cards__image').src;
    popupImage.querySelector('.popup-image__heading').textContent = currentItem.querySelector('.cards__title').textContent;
    popupImage.querySelector('.popup-image__close-btn').addEventListener('click', () => {
      popupClose(popupImage);
    });
  });
  currentCard.querySelector('.cards__like').addEventListener('click', function(event){
    event.target.classList.toggle('cards__like_active');
  });
  currentCard.querySelector('.cards__delite').addEventListener('click', function(event){
    event.target.closest('.cards__item').remove();
  });
};


initialCards.forEach(function (element) { 
  const cardTemplate = cardsTemplate.content.cloneNode(true);
  cardTemplate.querySelector('.cards__image').src = element.link;
  cardTemplate.querySelector('.cards__title').textContent = element.name;
  setListeners(cardTemplate);
  cards.append(cardTemplate);
});


const submitCard = () => {
  const cardTemplate = cardsTemplate.content.cloneNode(true);
  cardTemplate.querySelector('.cards__image').src = popupPlace.querySelector('.popup__input_el_img').value;
  cardTemplate.querySelector('.cards__title').textContent = popupPlace.querySelector('.popup__input_el_title').value;
  setListeners(cardTemplate);
  cards.append(cardTemplate);
};





let popupOpen = function(currentPopup) {
  currentPopup.classList.add('popup__opened');
}
profileEditButton.addEventListener('click', function() {
  popupOpen(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
profileSubmitButton.addEventListener('click', function() {
  popupOpen(popupPlace);
  popupPlace.querySelector('.popup__input').value = '';
});


let popupClose = function(currentPopup) {
  currentPopup.classList.remove('popup__opened');
}
popupProfileCloseButton.addEventListener('click', function() {
  popupClose(popupProfile);
});
popupPlaceCloseButton.addEventListener('click', function() {
  popupClose(popupPlace);
});

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
    popupClose(popupProfile);
}
popupProfileFormElement.addEventListener('submit', formSubmitHandler);


function formSubmitHandler(evt) {
  evt.preventDefault();
  submitCard();
  popupClose(popupPlace);
}
popupPlaceFormElement.addEventListener('submit', formSubmitHandler);