const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__add-btn');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup-profile');
const inputsProfile = popupProfile.querySelectorAll('input');
const popupProfileFormElement = popupProfile.querySelector('.popup__form');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-btn');

const popupPlace = document.querySelector('.popup-place');
const inputsPlace = popupPlace.querySelectorAll('input');
const popupPlaceFormElement = popupPlace.querySelector('.popup__form');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-btn');

const popupImage = document.querySelector('.popup-image');

const cards = document.querySelector('.cards');
const template = document.querySelector('#cards-template');


const cardListeners = (currentCard) => {
  const card = currentCard.querySelector('.cards__item');

  currentCard.querySelector('.cards__image').addEventListener('click', () => { 
      openPopup(popupImage);
      popupImage.querySelector('.popup-image__image').src = card.querySelector('.cards__image').src; 
      popupImage.querySelector('.popup-image__image').alt = card.querySelector('.cards__image').src; 
      popupImage.querySelector('.popup-image__heading').textContent = card.querySelector('.cards__title').textContent; 
      popupImage.querySelector('.popup-image__close-btn').addEventListener('click', () => { 
      closePopup(popupImage);
      });
    }); 

  currentCard.querySelector('.cards__like').addEventListener('click', function(event){
    event.target.classList.toggle('cards__like_active');
  });
  currentCard.querySelector('.cards__delite').addEventListener('click', function(){
    card.remove();
  });
};


initialCards.reverse().forEach(function (element) {
  const newCard = template.content.cloneNode(true);
  newCard.querySelector('.cards__image').src = element.link;
  newCard.querySelector('.cards__title').textContent = element.name;
  cardListeners(newCard);
  cards.prepend(newCard);
});

function createCard(input) {
  const newCard = template.content.cloneNode(true);
  newCard.querySelector('.cards__image').src = input[1];
  newCard.querySelector('.cards__image').alt = input[1];
  newCard.querySelector('.cards__title').textContent = input[0];
  cardListeners(newCard);
  return newCard
}
function addCard(item) {
  const currentItem = createCard(item);
  cards.prepend(currentItem);
}



const openPopup = function(currentPopup) {
  currentPopup.classList.add('popup__opened');
}
profileEditButton.addEventListener('click', function() {
  openPopup(popupProfile);
  inputsProfile[0].value = profileTitle.textContent;
  inputsProfile[1].value = profileDescription.textContent;
});
profileAddButton.addEventListener('click', function() {
  openPopup(popupPlace);
  popupPlaceFormElement.reset();
});


const closePopup = function(currentPopup) {
  currentPopup.classList.remove('popup__opened');
}
popupProfileCloseButton.addEventListener('click', function() {
  closePopup(popupProfile);
});
popupPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupPlace);
});

// let popupRemoveByOverlay = function(event) {
//     if (event.target == event.currentTarget){
//         popupToggle();
//     }
// }
// popup.addEventListener('click', popupRemoveByOverlay);


function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputsProfile[0].value;
    profileDescription.textContent = inputsProfile[1].value;
    closePopup(popupProfile);
}
popupProfileFormElement.addEventListener('submit', profileFormSubmitHandler);


function placeFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(inputsPlace);
  closePopup(popupPlace);
}
popupPlaceFormElement.addEventListener('submit', placeFormSubmitHandler);