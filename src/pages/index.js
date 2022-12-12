import './index.css';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Api from '../scripts/components/Api.js';
import {
  profileEditButton,
  profileAddButton,
  profileAvatar,
  profileAvatarEdit,
  popupProfile,
  nameInput,
  jobInput,
  popupPlace,
  popupConfirm,
  popupAvatar,
  cardsContainer,
  profileValidation,
  newCardValidation,
  avatarValidation,
  popupWithImage,
  userInfo,
} from '../scripts/utils/constants.js';

let userId
const popupConfirmWithForm = new PopupWithForm(popupConfirm);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '1eff360a-a05c-459a-b944-dc645f17e291',
    'Content-Type': 'application/json'
  }
});
api.getUserAndCard()
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    profileAvatar.src = user.avatar;
    userId = cards._id;
    cardSection.renderItems(cards);
  })
  .catch(err => console.log(`Ошибка: ${err}`));

const createCard = (item) => {
  const card = new Card(item, '#cards-template', {


    handleCardClick: () => {
      popupWithImage.open(item);
    },

    handleDeleteClick: () => {
      popupConfirmWithForm.open();
      popupConfirmWithForm.createSubmitHandler(() => {
        api.deleteCard(item._id)
          .then(() => {
            card.deleteCard();
            popupConfirmWithForm.close();
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      })
    },

    handleLikeClick: () => {
      if (card.isLiked()) {
        api.deleteLike(item._id)
        .then(res => {
          card.setLikesAmount(res.likes)
        })
        .catch(err => console.log(`Ошибка: ${err}`));
      } else {
        api.addLike(item._id)
          .then(res => {
            card.setLikesAmount(res.likes)
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      }
    }


  }, userId);
  const cardElement = card.generateCard();
  return cardElement
};
const cardSection = new Section({
  renderer: (item) => {
    const newCard = createCard(item);
    cardSection.addItem(newCard);
  }
}, cardsContainer);


const submitProfileForm = (inputs) => {
  api.addProfile(inputs)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfileWithForm.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
};
const submitPlaceForm = (inputs) => {
  api.addCard(inputs)
    .then(res => {
      const newCard = createCard(res);
      cardSection.addItem(newCard);
      popupPlaceWithForm.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
};
const submitAvatar = (input) => {
  api.addAvatar(input)
    .then(res => {
      userInfo.setAvatar(res);
      popupAvatarWithForm.close();
      avatarValidation.resetValidation();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
}

const popupProfileWithForm = new PopupWithForm(popupProfile, submitProfileForm);
const popupPlaceWithForm = new PopupWithForm(popupPlace, submitPlaceForm);
const popupAvatarWithForm = new PopupWithForm(popupAvatar, submitAvatar);

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
profileAvatarEdit.addEventListener('click', () => {
  popupAvatarWithForm.open();
});

popupProfileWithForm.setEventListeners();
popupPlaceWithForm.setEventListeners();
popupWithImage.setEventListeners();
popupConfirmWithForm.setEventListeners();
popupAvatarWithForm.setEventListeners();
profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();