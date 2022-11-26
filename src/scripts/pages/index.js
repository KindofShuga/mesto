import '../../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  initialCards,
  profileTitle,
  profileDescription,
  profileEditButton,
  profileAddButton,
  popupProfile,
  popupPlace,
  popupImage,
  cardsContainer,
  profileValidation,
  newCardValidation,
  nameInput,
  jobInput
} from '../utils/constants.js'


const userInfo = new UserInfo(profileTitle, profileDescription);

const openPopup = (popupElement) => {
  const popup = new Popup(popupElement);
  popup.open();
  popup.setEventListeners();
}


const createCard = (item) => {
  const card = new Card(item, '#cards-template', {
    handleCardClick: () => {
      const popupWithImage = new PopupWithImage(popupImage, item);
      popupWithImage.open();
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





const popupWithForm = (popup, submitForm) => {
  const popupWithForm = new PopupWithForm(popup, submitForm);
  popupWithForm.setEventListeners();
}

const submitProfileForm = (data) => {
  userInfo.setUserInfo(data);
};
const submitPlaceForm = (inputs) => {
  addSection(inputs);
};




profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);
  const info = userInfo.getUserInfo();
  nameInput.value = info.name.textContent;
  jobInput.value = info.job.textContent;
  popupWithForm(popupProfile, submitProfileForm);
  profileValidation.resetValidation();
});

profileAddButton.addEventListener('click', function () {
  openPopup(popupPlace);
  popupWithForm(popupPlace, submitPlaceForm);
  newCardValidation.resetValidation();
});





addSection(initialCards);
profileValidation.enableValidation();
newCardValidation.enableValidation();