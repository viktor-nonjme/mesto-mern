import React from "react";
import Popup from "./Popup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  const [avatar, setAvatar] = React.useState(currentUser.avatar);

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
        
      avatar: avatarRef.current.value,
    });
  }

  function handleAvatarChange(event) {
    setAvatar(event.target.value);
  }

  return (
    <Popup
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        value={avatar || ""}
        onChange={handleAvatarChange}
        required
      />
      <span className="error"></span>
      <button type="submit" id="submit" className="button popup__button">
        Сохранить
      </button>
    </Popup>
  );
}

export default EditAvatarPopup;
