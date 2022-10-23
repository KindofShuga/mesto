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
const popupImageImg = popupImage.querySelector('.popup-image__image');
const popupImageHeading = popupImage.querySelector('.popup-image__heading');
const popupImageCloseButton = popupImage.querySelector('.popup-image__close-btn');

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards-template').content.querySelector('.cards__item');


const setCardListeners = (currentCard) => {
  currentCard.querySelector('.cards__image').addEventListener('click', () => { 
      popupImageImg.src = currentCard.querySelector('.cards__image').src; 
      popupImageImg.alt = currentCard.querySelector('.cards__title').textContent; 
      popupImageHeading.textContent = currentCard.querySelector('.cards__title').textContent;
      openPopup(popupImage);
  });
  currentCard.querySelector('.cards__like').addEventListener('click', (event) => {
    event.target.classList.toggle('cards__like_active');
  });
  currentCard.querySelector('.cards__delite').addEventListener('click', () => {
    currentCard.remove();
  });
};
function createCard(object) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector('.cards__image');
  cardImage.src = object.link;
  cardImage.alt = object.name;
  newCard.querySelector('.cards__title').textContent = object.name;
  setCardListeners(newCard);
  return newCard
};
function addCard(item) {
  const currentItem = createCard(item);
  cards.prepend(currentItem);
};

const removePopupByOverlay = (event) => {
  if (event.target == event.currentTarget){
    closePopup(event.target);
    };
};
const removePopupByEsc = (event) => {
  const popupOpened = event.currentTarget.querySelector('.popup__opened');
  if (event.key === 'Escape') {
      closePopup(popupOpened);
  };
};
const openPopup = function(currentPopup) {
  currentPopup.classList.add('popup__opened');
  document.addEventListener('keydown', removePopupByEsc);
  currentPopup.addEventListener('click', removePopupByOverlay);
};
const closePopup = (currentPopup) => {
  document.removeEventListener('keydown', removePopupByEsc);
  currentPopup.removeEventListener('click', removePopupByOverlay);
  currentPopup.classList.remove('popup__opened');
};
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
};
function placeFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCardObj = {name: titleInput.value, link: imgInput.value};
  const addButton = popupPlace.querySelector('.popup__submit-btn');
  addCard(newCardObj);
  closePopup(popupPlace);
  addInactiveButton(addButton);
};



profileEditButton.addEventListener('click', function() {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
profileAddButton.addEventListener('click', function() {
  openPopup(popupPlace);
  popupPlaceFormElement.reset();
});
popupProfileCloseButton.addEventListener('click', function() {
  closePopup(popupProfile);
});
popupPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupPlace);
});
popupImageCloseButton.addEventListener('click', () => { 
  closePopup(popupImage);
});

popupProfileFormElement.addEventListener('submit', profileFormSubmitHandler);
popupPlaceFormElement.addEventListener('submit', placeFormSubmitHandler);

initialCards.reverse().forEach(addCard);