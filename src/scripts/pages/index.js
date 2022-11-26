import '../../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import {
  initialCards,
  profileEditButton,
  profileAddButton,
  popupProfileWithForm,
  popupPlaceWithForm,
  popupWithImage,
  userInfo,
  cardsContainer,
  profileValidation,
  newCardValidation,
  nameInput,
  jobInput
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
const addSection = (item) => {
  const section = new Section({
    items: item,
    renderer: (item) => {
      const newCard = createCard(item);
      section.addItem(newCard)
    }
  }, cardsContainer);
  const sectionElement = section.renderItems();
  return sectionElement
};

export const submitProfileForm = (data) => {
  userInfo.setUserInfo(data);
};
export const submitPlaceForm = (inputs) => {
  addSection(inputs);
};
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
addSection(initialCards);
profileValidation.enableValidation();
newCardValidation.enableValidation();