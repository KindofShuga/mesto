import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
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
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup-profile');
const nameInput = popupProfile.querySelector('.popup__input_el_name');
const jobInput = popupProfile.querySelector('.popup__input_el_job');
const popupProfileFormElement = popupProfile.querySelector('.popup__form');

const popupPlace = document.querySelector('.popup-place');
const titleInput = popupPlace.querySelector('.popup__input_el_title');
const imgInput = popupPlace.querySelector('.popup__input_el_img');
const popupPlaceFormElement = popupPlace.querySelector('.popup__form');

const popupImage = document.querySelector('.popup-image');

const cardsContainer = document.querySelector('.cards');
const profileValidation = new FormValidator(settings, popupProfileFormElement);
const newCardValidation = new FormValidator(settings, popupPlaceFormElement);

const popupProfileClass = new Popup(popupProfile);
const popupPlaceClass = new Popup(popupPlace);
const popupImageClass = new Popup(popupImage);


const submitProfileForm = (evt) => {
  evt.preventDefault();
  const userInfo = new UserInfo({name: nameInput, job: jobInput})
  userInfo.setUserInfo();
  popupProfileClass.close();
};
const submitPlaceForm = (evt) => {
  evt.preventDefault();
  const newCardObj = [{name: titleInput.value, link: imgInput.value}];
  const newCard = new Section({
    items: newCardObj,
    renderer: (item) => {
      const card = new Card(item,'#cards-template', {handleCardClick: (event) => {
        const popupWithImage = new PopupWithImage(popupImage, event);
        popupWithImage.open();
        popupImageClass.setEventListeners();
      }});
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
  },  cardsContainer);
  newCard.renderItems();
  popupPlaceClass.close();
};

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item,'#cards-template', {handleCardClick: (event) => {
      const popupWithImage = new PopupWithImage(popupImage, event);
      popupWithImage.open();
      popupImageClass.setEventListeners();
    }});
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
},  cardsContainer);
defaultCardList.renderItems();





profileEditButton.addEventListener('click', function() {
  popupProfileClass.open();
  popupProfileClass.setEventListeners();

  const userInfo = new UserInfo({name: nameInput, job: jobInput});
  userInfo.getUserInfo();

  profileValidation.resetValidation();
  const PopupProfileWithForm = new PopupWithForm(popupProfile, submitProfileForm);
  PopupProfileWithForm.setEventListeners();
});
profileAddButton.addEventListener('click', function() {
  popupPlaceClass.open();
  popupPlaceClass.setEventListeners();

  popupPlaceFormElement.reset();
  newCardValidation.resetValidation();
  
  const PopupPlaceWithForm = new PopupWithForm(popupPlace, submitPlaceForm);
  PopupPlaceWithForm.setEventListeners();
});

profileValidation.enableValidation();
newCardValidation.enableValidation();

