import '../../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  initialCards,
  profileEditButton,
  profileAddButton,
  popupProfile,
  popupPlace,
  popupWithImage,
  userInfo,
  cardsContainer,
  profileValidation,
  newCardValidation,
  nameInput,
  jobInput,
} from '../utils/constants.js'

const createCard = (item) => {
  const card = new Card(item, '#cards-template', {
    handleCardClick: () => {
      popupWithImage.open(item);
    }
  });
  const cardElement = card.generateCard();
  return cardElement
};
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item);
    cardSection.addItem(newCard);
  }
}, cardsContainer);

const submitProfileForm = (data) => {
  userInfo.setUserInfo(data);
};
const submitPlaceForm = (inputs) => {
  const newCard = createCard(inputs);
  cardSection.addItem(newCard);
};

const popupProfileWithForm = new PopupWithForm(popupProfile, submitProfileForm);
const popupPlaceWithForm = new PopupWithForm(popupPlace, submitPlaceForm);

profileEditButton.addEventListener('click', function () {
  popupProfileWithForm.open();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.job;
  profileValidation.resetValidation();
});
profileAddButton.addEventListener('click', function () {
  popupPlaceWithForm.open();
  newCardValidation.resetValidation();
});

popupProfileWithForm.setEventListeners();
popupPlaceWithForm.setEventListeners();
popupWithImage.setEventListeners();
cardSection.renderItems()
profileValidation.enableValidation();
newCardValidation.enableValidation();