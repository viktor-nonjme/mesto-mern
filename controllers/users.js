const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-error");
const BadRequestError = require("../errors/bad-request-error");

const login = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new BadRequestError(errors.array()[0].msg));
  }

  const { email, password } = req.body;

  const SECRET_KEY = process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "some-secret-key";

  User.findUserByCredentials(email, password)
    .then((user) => {
      // Создаём jwt token и отправляем его
      const token = jwt.sign({ _id: user._id }, SECRET_KEY);

      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });

      res.status(200).send({ token, id: user._id });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  return User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new BadRequestError(errors.array()[0].msg));
  }

  return bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: `${hash}`,
        name: req.body.name || "Гость",
        about: req.body.about || "Войдите в систему",
        avatar: req.body.avatar || "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      })
    )
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch(() =>
      next(
        new ConflictError(
          "Ошибка при создании пользователя или email уже используется"
        )
      )
    );
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  login,
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
};
