import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

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
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAvatarEdit = document.querySelector('.profile__avatar-container');

export const popupProfile = document.querySelector('.popup-profile');
export const nameInput = popupProfile.querySelector('.popup__input_el_name');
export const jobInput = popupProfile.querySelector('.popup__input_el_job');
const popupProfileFormElement = popupProfile.querySelector('.popup__form');

export const popupPlace = document.querySelector('.popup-place');
const popupPlaceFormElement = popupPlace.querySelector('.popup__form');

const popupImage = document.querySelector('.popup-image');

export const popupConfirm = document.querySelector('.popup-confirm');

export const popupAvatar = document.querySelector('.popup-avatar');
const popupAvatarFormElement = popupAvatar.querySelector('.popup__form');

export const cardsContainer = document.querySelector('.cards');
export const profileValidation = new FormValidator(settings, popupProfileFormElement);
export const newCardValidation = new FormValidator(settings, popupPlaceFormElement);
export const avatarValidation = new FormValidator(settings, popupAvatarFormElement);
export const popupWithImage = new PopupWithImage(popupImage);
export const userInfo = new UserInfo(profileTitle, profileDescription, profileAvatar);