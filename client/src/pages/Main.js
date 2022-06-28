import React from "react";
import Content from "../components/Content";
import ImagePopup from "../components/ImagePopup";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const MainPage = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  
  const userId = currentUser.id;
  const token = currentUser.token;

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setСards] = React.useState([]);

  React.useEffect(() => {
    const fetchCardsData = async () => {
      const cards = await api.loadCards();
      setСards(cards);
    };

    fetchCardsData().catch(console.error);
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(link) {
    setSelectedCard(link);
  }

  function closeAllPopups() {
    if (isAddPlacePopupOpen) {
      setAddPlacePopupOpen(!isAddPlacePopupOpen);
    }
    if (isEditProfilePopupOpen) {
      setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    if (isEditAvatarPopupOpen) {
      setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    if (selectedCard) {
      setSelectedCard(null);
    }
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateInfo(name, about, userId, token)
      .then((user) => {
        props.onSetCurrentUser(user);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .avatar(avatar, userId, token)
      .then((user) => {
        props.onSetCurrentUser(user);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleCardLike(id) {
    api
      .like(id, token)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === id ? newCard : c));
        setСards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(id) {
    if (window.confirm("Вы точно хотите удалить карточку?")) {
      api
        .delete(id, token)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== id);
          setСards(newCards);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.postCard(name, link, token)
      .then((newCard) => {
        setСards([...cards, newCard]); 
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err));
  }

  return (
    <React.Fragment>
      <Content
        onCardLike={handleCardLike} 
        onCardDelete={handleCardDelete}
        cards={cards}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        onSubmitCard={handleAddPlaceSubmit}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
    </React.Fragment>
  );
};

export default MainPage;
