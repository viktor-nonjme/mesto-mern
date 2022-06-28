import React from "react";

function AuthForm(props) {
  const [form, setForm] = React.useState({email: "", password: ""});

  function changeHandler(event) {
      setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submitHandler(event) {
    event.preventDefault();

    props.onSubmit({ email: form.email, password: form.password })
  }

  return (
    <form onSubmit={submitHandler} className="form" name={props.name}>
      <fieldset className="form__content">
        <legend className="form__title">{props.legend}</legend>
        <input
          type="email"
          name="email"
          className="popup__input"
          placeholder="Почта"
          value={form.email || ""}
          onChange={changeHandler}
          required
        />
        <span className="error"></span>
        <input
          type="password"
          name="password"
          className="popup__input"
          placeholder="Пароль"
          minLength="8"
          value={form.password || ""}
          onChange={changeHandler}
          required
        />
        <span className="error"></span>
        <button type="submit" className="button form__button">
          {props.button}
        </button>
        <span className="error__fetch">{props.message}</span>
      </fieldset>
    </form>
  );
}

export default AuthForm;
