import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../utils/api";

class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.registrationHandler = this.registrationHandler.bind(this);
  }

  loginHandler({ email, password }) {
    this.setState({
      message: "",
    });

    api
      .login(email, password)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 400) {
          this.setState({
            message: "Пользователь уже существует",
          });
        }
        if (res.status === 401) {
          this.setState({
            message: "Неправильная почта или пароль",
          });
        }
        if (res.status === 500) {
          this.setState({
            message: "Сервер временно недоступен",
          });
        }
      })
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.id);
        this.props.onToken(res.token);
      })
      .then(() => {
        this.props.navigate("/");
      })
      .catch((error) => console.log(error));
  }

  registrationHandler({ email, password }) {
    this.setState({
      message: "",
    });

    api
      .registration(email, password)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        if (res.status === 400) {
          this.setState({
            message: "Проверьте почту или пароль",
          });
        }
        if (res.status === 409) {
          this.setState({
            message:
              "Ошибка при создании пользователя или email уже используется",
          });
        }
        if (res.status === 500) {
          this.setState({
            message: "Сервер временно недоступен",
          });
        }
      })
      .then((res) => {
        if (res) {
          this.props.navigate("/login");
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const login = {
      name: "login",
      legend: "Вход",
      button: "Войти",
      onSubmit: this.loginHandler,
      message: this.state.message,
    };

    const registration = {
      name: "registration",
      legend: "Регистрация",
      button: "Зарегистрироваться",
      onSubmit: this.registrationHandler,
      message: this.state.message,
    };

    return (
      <div className="container layout">
        {window.location.pathname === "/login" ? (
          <AuthForm {...login} />
        ) : (
          <AuthForm {...registration} />
        )}
      </div>
    );
  }
}

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};

export default withRouter(AuthPage);
