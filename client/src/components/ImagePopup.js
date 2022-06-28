import close from "../assets/images/close.svg";

function ImagePopup(props) {
  return (
    <div className={`popup popup-image ${props.card && "popup_is-opened"}`}>
      <div className="popup__content popup-image__content">
        <img
          onClick={props.onClose}
          src={close}
          alt="Закрыть"
          className="popup__close"
        />
        <img src={props.card} alt="Карточка" className="popup-image__img" />
      </div>
    </div>
  );
}

export default ImagePopup;
