const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__add-btn');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup-profile');
const nameInput = popupProfile.querySelector('.popup__input_el_name');
const jobInput = popupProfile.querySelector('.popup__input_el_job');
const popupProfileFormElement = popupProfile.querySelector('.popup__form');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-btn');

const popupPlace = document.querySelector('.popup-place');
const titleInput = popupPlace.querySelector('.popup__input_el_title');
const imgInput = popupPlace.querySelector('.popup__input_el_img');
const popupPlaceFormElement = popupPlace.querySelector('.popup__form');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-btn');

const popupImage = document.querySelector('.popup-image');

const cards = document.querySelector('.cards');
const template = document.querySelector('#cards-template').content.querySelector('.cards__item');


const setCardListeners = (currentCard) => {
currentCard.querySelector('.cards__image').addEventListener('click', () => { 
      openPopup(popupImage);
      popupImage.querySelector('.popup-image__image').src = currentCard.querySelector('.cards__image').src; 
      popupImage.querySelector('.popup-image__image').alt = currentCard.querySelector('.cards__title').textContent; 
      popupImage.querySelector('.popup-image__heading').textContent = currentCard.querySelector('.cards__title').textContent; 
      popupImage.querySelector('.popup-image__close-btn').addEventListener('click', () => { 
      closePopup(popupImage);
      });
    });
  currentCard.querySelector('.cards__like').addEventListener('click', function(event){
    event.target.classList.toggle('cards__like_active');
  });
  currentCard.querySelector('.cards__delite').addEventListener('click', function(){
    currentCard.remove();
  });
};

initialCards.reverse().forEach(addCard);

function createCard(input) {
  const newCard = template.cloneNode(true);
  newCard.querySelector('.cards__image').src = input.link;
  newCard.querySelector('.cards__image').alt = input.name;
  newCard.querySelector('.cards__title').textContent = input.name;
  setCardListeners(newCard);
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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
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
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
}
popupProfileFormElement.addEventListener('submit', profileFormSubmitHandler);


function placeFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCardObj = {name: titleInput.value, link: imgInput.value};
  addCard(newCardObj);
  closePopup(popupPlace);
}
popupPlaceFormElement.addEventListener('submit', placeFormSubmitHandler);