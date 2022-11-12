import Card from './Card.js';
import FormValidator from './FormValidator.js';
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    like: '.cards__like'
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
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  likeSelector: '.cards__like',
  likeActiveClass: 'cards__like_active'
};

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

const cardsContainer = document.querySelector('.cards');
const profileValidation = new FormValidator(settings, popupProfileFormElement);
const newCardValidation = new FormValidator(settings, popupPlaceFormElement);

const removePopupByOverlay = (event) => {
  if (event.target == event.currentTarget){
    closePopup(event.target);
    };
};
const removePopupByEsc = (event) => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup__opened');
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
const addCard = (item) => {
  const card = new Card(item, '#cards-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement); 
};
const submitProfileForm = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
  profileValidation.enableValidation();
};
const submitPlaceForm = (evt) => {
  evt.preventDefault();
  const newCardObj = {name: titleInput.value, link: imgInput.value};
  addCard(newCardObj);
  closePopup(popupPlace);
  newCardValidation.enableValidation(); 
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
popupProfileFormElement.addEventListener('submit', submitProfileForm);
popupPlaceFormElement.addEventListener('submit', submitPlaceForm);


initialCards.reverse().forEach(addCard);

profileValidation.enableValidation();
newCardValidation.enableValidation();

  
export {popupImage, popupImageImg, popupImageHeading, openPopup}