const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");

const SECRET_KEY = process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "some-secret-key";

module.exports.authorization = (req, res, next) => {

  let token = req.cookies.token || undefined;

  if (!token) {

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(new UnauthorizedError("Нужна авторизация"));
    }

    token = authorization.replace("Bearer ", "");

    let payload;

    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return next(new UnauthorizedError("Нужна авторизация"));
    }

    req.user = payload;

    return next();
  }

  let payload;

  try {

    payload = jwt.verify(token, SECRET_KEY);
  
  } catch (err) {
    return next(new UnauthorizedError("Нужна авторизация"));
  }

  req.user = payload;

  return next();
};
