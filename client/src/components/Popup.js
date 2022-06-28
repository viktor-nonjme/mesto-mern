import React from "react";
import close from "../assets/images/close.svg";

function Popup(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen && "popup_is-opened"
      }`}
    >
      <div className="popup__content">
        <img
          onClick={props.onClose}
          src={close}
          alt="Закрыть"
          className="popup__close"
        />
        <h3 className="popup__title">{props.title}</h3>
        <form
          onSubmit={props.onSubmit}
          className="popup__form"
          name={props.name}
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default Popup;
