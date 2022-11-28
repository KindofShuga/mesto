import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

export const initialCards = [
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
export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    likeSelector: '.cards__like',
    likeActiveClass: 'cards__like_active'
};
export const profileEditButton = document.querySelector('.profile__edit-btn');
export const profileAddButton = document.querySelector('.profile__add-btn');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const popupProfile = document.querySelector('.popup-profile');
export const nameInput = popupProfile.querySelector('.popup__input_el_name');
export const jobInput = popupProfile.querySelector('.popup__input_el_job');
export const popupProfileFormElement = popupProfile.querySelector('.popup__form');

export const popupPlace = document.querySelector('.popup-place');
export const titleInput = popupPlace.querySelector('.popup__input_el_title');
export const imgInput = popupPlace.querySelector('.popup__input_el_img');
export const popupPlaceFormElement = popupPlace.querySelector('.popup__form');

export const popupImage = document.querySelector('.popup-image');

export const cardsContainer = document.querySelector('.cards');
export const profileValidation = new FormValidator(settings, popupProfileFormElement);
export const newCardValidation = new FormValidator(settings, popupPlaceFormElement);
export const popupWithImage = new PopupWithImage(popupImage);
export const userInfo = new UserInfo(profileTitle, profileDescription);