import React from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = React.memo((props) => {
  const navigate = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.link);
  }

  function handleLikeClick() {
    if (currentUser.name) {
      props.onCardLike(props.id);
    } else {
      navigate("/login");
    }
  }

  function handleDelete() {
    if (currentUser.name) {
      props.onCardDelete(props.id);
    } else {
      navigate("/login");
    }
  }

  const isOwn = props.owner.toString() === currentUser._id;

  const cardDeleteButtonClassName = `place-card__delete-icon ${
    isOwn ? "place-card__delete-button_visible" : ""
  }`;

  const isLiked = props.likes.some((id) => {
      return id === currentUser._id;
  });

  const cardLikeButtonClassName = `place-card__like-icon${
    isLiked ? " place-card__like-icon_liked" : ""
  }`;

  return (
    <div className="place-card">
      <button onClick={handleDelete} className={cardDeleteButtonClassName}></button>
      <div
        onClick={handleClick}
        className="place-card__image"
        style={{ backgroundImage: `url(${props.link})` }}
      ></div>
      <div className="place-card__description">
        <h3 className="place-card__name">{props.name}</h3>
        <div>
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <p>{props.likes.length || 0}</p>
        </div>
      </div>
    </div>
  );
});

export default Card;
