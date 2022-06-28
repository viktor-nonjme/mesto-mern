import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import api from "./utils/api";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import MainPage from "./pages/Main";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import ProfilePage from "./pages/Profile";

function App() {
  const currentToken = localStorage.getItem("token");

  const [currentUser, setCurrentUser] = React.useState({});
  const [token, setToken] = React.useState(currentToken);

  React.useEffect(() => {
    if (token) {
      const id = localStorage.getItem("id");
      const fetchUserData = async () => {
        const user = await api.getUserInfo(id, token);
        setCurrentUser({...user, id, token});
      };
  
      fetchUserData().catch((err) => console.log(err));
    }
  }, [token]);

  function handleLogout() {
    setToken(null);
    setCurrentUser({});
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <React.Fragment>
          <Header onLogout={handleLogout} isAuth={token} />
          <Routes>
            <Route
              exact
              path="/"
              element={<MainPage onSetCurrentUser={setCurrentUser} />}
            />
            <Route path="/login" element={<AuthPage onToken={setToken} />} />
            <Route path="/registration" element={<AuthPage />} />
            <Route
              path="/profile"
              element={
                token ? <ProfilePage /> : <Navigate replace to="/login" />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </React.Fragment>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
