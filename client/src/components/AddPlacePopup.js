import React from "react";
import Popup from "./Popup";

function AddPlacePopup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  const [name, setName] = React.useState(null);
  const [link, setLink] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    props.onSubmitCard({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  return (
    <Popup
      name="add-place"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={nameRef}
        onChange={handleNameChange}
        type="text"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name || ""}
        required
      />
      <span className="error"></span>
      <input
        ref={linkRef}
        onChange={handleLinkChange}
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        value={link || ""}
        required
      />
      <span className="error"></span>
      <button type="submit" className="button popup__button">
        +
      </button>
    </Popup>
  );
}

export default AddPlacePopup;
