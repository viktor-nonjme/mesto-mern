const { body } = require("express-validator");
const User = require("../models/user");

exports.registrValidator = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject(
            "A user with this email address already exists"
          );
        }
      } catch (err) {
        console.log(err);
      }
    }),
  body(
    "password",
    "The password must be at least 8 characters long. Input numbers or letters"
  )
    .isLength({ min: 8, max: 30 })
    .isAlphanumeric()
    .trim(),
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject("User does not exist");
        }
      } catch (err) {
        console.log(err);
      }
    }),
  body(
    "password",
    "The password must be at least 8 characters long. Input numbers or letters"
  )
    .isLength({ min: 8, max: 30 })
    .isAlphanumeric()
    .trim(),
];

exports.cardValidator = [
  body("name", "Имя должно быть длиннее 2 символов")
    .isLength({ min: 2, max: 30 }),
  body(
    "link",
    "Введите ссылку"
  )
    .isURL(),
];
