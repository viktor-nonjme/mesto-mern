import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container layout">
      <div>
        <p className="error__not-found">
          404
        </p>
        <p className="error__text">
          Страница не найдена или произошла ошибка
        </p>
        <button className="button form__button" onClick={() => navigate(-1)}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default NotFound;
