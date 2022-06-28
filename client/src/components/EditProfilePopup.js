import React from "react";
import Popup from "./Popup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(event) {
    event.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAboutChange(event) {
    setDescription(event.target.value);
  }

  return (
    <Popup
      name="user-info"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleNameChange}
        type="text"
        className="popup__input"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="30"
        value={name || ""}
        required
      />
      <span className="error"></span>
      <input
        onChange={handleAboutChange}
        type="text"
        className="popup__input"
        placeholder="О себе"
        minLength="2"
        maxLength="30"
        value={description || ""}
        required
      />
      <span className="error"></span>
      <button
        type="submit"
        id="submit"
        className="button popup__button"
      >
        Сохранить
      </button>
    </Popup>
  );
}

export default EditProfilePopup;
