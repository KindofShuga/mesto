import '../../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
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
} from '../utils/constants.js';

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
api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res);
    profileAvatar.src = res.avatar;
    userId = res._id;
  })

const createCard = (item) => {
  const card = new Card(item, '#cards-template', {


    handleCardClick: () => {
      popupWithImage.open(item);
    },

    handleDeleteClick: () => {
      popupConfirmWithForm.open();
      popupConfirmWithForm.createSubmitHandler(() => {
        api.deleteCard(item._id)
          .then(() => card.deleteCard());
      })
    },

    handleLikeClick: () => {
      if (card.isLiked()) {
        api.deleteLike(item._id)
        .then(res => {
          card.setLikesAmount(res.likes)
        })
      } else {
        api.addLike(item._id)
          .then(res => {
            card.setLikesAmount(res.likes)
          });
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
    .then(() => {
      userInfo.setUserInfo(inputs);
    });
};
const submitPlaceForm = (inputs) => {
  api.addCard(inputs)
    .then(res => {
      const newCard = createCard(res);
      cardSection.addItem(newCard);
    })
};
const submitAvatar = (input) => {
  api.addAvatar(input)
    .then(res => {
      userInfo.setAvatar(res);
      avatarValidation.resetValidation();
    })
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

api.getInitialCards()
  .then(res => {
    cardSection.renderItems(res);
  })
popupProfileWithForm.setEventListeners();
popupPlaceWithForm.setEventListeners();
popupWithImage.setEventListeners();
popupConfirmWithForm.setEventListeners();
popupAvatarWithForm.setEventListeners();
profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();