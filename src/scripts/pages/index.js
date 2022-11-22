import '../../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  initialCards,
  profileEditButton,
  profileAddButton,
  popupProfile,
  nameInput,
  jobInput,
  popupPlace,
  titleInput,
  imgInput,
  popupPlaceFormElement,
  popupImage,
  cardsContainer,
  profileValidation,
  newCardValidation,
  popupProfileClass,
  popupPlaceClass,
  popupImageClass
} from '../utils/constants.js'


const submitProfileForm = (evt) => {
  evt.preventDefault();
  const userInfo = new UserInfo({ name: nameInput, job: jobInput })
  userInfo.setUserInfo();
  popupProfileClass.close();
};
const submitPlaceForm = (evt) => {
  evt.preventDefault();
  const newCardObj = [{ name: titleInput.value, link: imgInput.value }];
  const newCard = new Section({
    items: newCardObj,
    renderer: (item) => {
      const card = new Card(item, '#cards-template', {
        handleCardClick: (event) => {
          const popupWithImage = new PopupWithImage(popupImage, event);
          popupWithImage.open();
          popupImageClass.setEventListeners();
        }
      });
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
  }, cardsContainer);
  newCard.renderItems();
  popupPlaceClass.close();
};
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#cards-template', {
      handleCardClick: (event) => {
        const popupWithImage = new PopupWithImage(popupImage, event);
        popupWithImage.open();
        popupImageClass.setEventListeners();
      }
    });
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardsContainer);
profileEditButton.addEventListener('click', function () {
  popupProfileClass.open();
  popupProfileClass.setEventListeners();

  const userInfo = new UserInfo({ name: nameInput, job: jobInput });
  userInfo.getUserInfo();

  profileValidation.resetValidation();
  const PopupProfileWithForm = new PopupWithForm(popupProfile, submitProfileForm);
  PopupProfileWithForm.setEventListeners();
});
profileAddButton.addEventListener('click', function () {
  popupPlaceClass.open();
  popupPlaceClass.setEventListeners();

  popupPlaceFormElement.reset();
  newCardValidation.resetValidation();

  const PopupPlaceWithForm = new PopupWithForm(popupPlace, submitPlaceForm);
  PopupPlaceWithForm.setEventListeners();
});
defaultCardList.renderItems();
profileValidation.enableValidation();
newCardValidation.enableValidation();