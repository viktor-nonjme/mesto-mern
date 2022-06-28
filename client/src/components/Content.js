import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <React.Fragment>
      <div className="profile layout">
        <div className="user-info">
          <div
            onClick={props.onEditAvatar}
            className="user-info__photo"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <div className="user-info__data">
            <h1 className="user-info__name">{currentUser.name || "Гость"}</h1>
            <p className="user-info__job">{currentUser.about || "Войдите в систему"}</p>
            <button
              onClick={props.onEditProfile}
              className="button user-edit__button"
            >
              Edit
            </button>
          </div>
          <button
            onClick={props.onAddPlace}
            className="button user-info__button"
          >
            +
          </button>
        </div>
      </div>

      <div className="places-list layout">
        {props.cards.map((card, index) => {
          return (
            <Card
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              key={index.toString()}
              value={index}
              link={card.link}
              name={card.name}
              likes={card.likes}
              owner={card.owner}
              id={card._id}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Main;
