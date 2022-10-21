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

const cards = document.querySelector('.cards');
const template = document.querySelector('#cards-template').content.querySelector('.cards__item');


const setCardListeners = (currentCard) => {
currentCard.querySelector('.cards__image').addEventListener('click', () => { 
      openPopup(popupImage);
      popupImage.querySelector('.popup-image__image').src = currentCard.querySelector('.cards__image').src; 
      popupImage.querySelector('.popup-image__image').alt = currentCard.querySelector('.cards__title').textContent; 
      popupImage.querySelector('.popup-image__heading').textContent = currentCard.querySelector('.cards__title').textContent; 
      popupImage.querySelector('.popup-image__close-btn').addEventListener('click', () => { 
      closePopup(popupImage);
      });
    });
  currentCard.querySelector('.cards__like').addEventListener('click', function(event){
    event.target.classList.toggle('cards__like_active');
  });
  currentCard.querySelector('.cards__delite').addEventListener('click', function(){
    currentCard.remove();
  });
};

initialCards.reverse().forEach(addCard);

function cardObject(object) {
  const newCard = template.cloneNode(true);
  newCard.querySelector('.cards__image').src = object.link;
  newCard.querySelector('.cards__image').alt = object.name;
  newCard.querySelector('.cards__title').textContent = object.name;
  setCardListeners(newCard);
  return newCard
}
function addCard(item) {
  const currentItem = cardObject(item);
  cards.prepend(currentItem);
}



const openPopup = function(currentPopup) {
  currentPopup.classList.add('popup__opened');
}
profileEditButton.addEventListener('click', function() {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
profileAddButton.addEventListener('click', function() {
  openPopup(popupPlace);
  popupPlaceFormElement.reset();
});

const closePopup = (currentPopup) => {
  currentPopup.classList.remove('popup__opened');
}
popupProfileCloseButton.addEventListener('click', function() {
  closePopup(popupProfile);
});
popupPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupPlace);
});



const showError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass)
  errorElement.textContent = errorMessage;
}
const hideError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}


const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};
const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', true)
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled', true)
  }
};

const setEventListeners = (form) => {
    const currentPopup = form.closest('.popup');
    const removePopupByOverlay = (event) => {
      if (event.target == event.currentTarget){
        closePopup(currentPopup);
      }
    };
    const removePopupByEsc = (event) => {
      if (event.key === 'Escape') {
          closePopup(currentPopup);
      }
    };
    currentPopup.addEventListener('click', removePopupByOverlay);
    currentPopup.addEventListener('keydown', removePopupByEsc);
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const buttonElement = form.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        isValid(form, input);
        toggleButtonState(inputList, buttonElement);
      });
      popupPlace.addEventListener('click', function(event) {
        if (event.key === 'Escape') {
          placeFormSubmitHandler(event);
        };
      });
    });
};


const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    setEventListeners(form);
  });
};
enableValidation(settings);





function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
}
popupProfileFormElement.addEventListener('submit', profileFormSubmitHandler);


function placeFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCardObj = {name: titleInput.value, link: imgInput.value};
  addCard(newCardObj);
  closePopup(popupPlace);
}
popupPlaceFormElement.addEventListener('submit', placeFormSubmitHandler);