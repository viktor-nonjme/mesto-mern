import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

function Header(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    props.onLogout();
    navigate("/login");
  }

  return (
    <header className="header layout">
      <Link to="/">
        <img src={logo} alt="Логотип проекта Место" className="logo" />
      </Link>
      {props.isAuth ? (
        <ul className="header__nav">
          <li>
            <Link className="header__link" to="/profile">Профиль</Link>
          </li>
          <li>
            <button onClick={logout} className="header__link header__link-logout">Выход</button>
          </li>
        </ul>
      ) : (
        <ul className="header__nav">
          <li>
            <Link className="header__link" to="/login">Вход</Link>
          </li>
          <li>
            <Link className="header__link" to="/registration">Регистрация</Link>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
