const users = require("express").Router();
const userController = require("../controllers/users");
const { authorization } = require("../middlewares/auth");
const { loginValidator, registrValidator } = require("../utils/validators");

users.post("/login", loginValidator, userController.login);
users.post("/registration", registrValidator, userController.createUser);
users.get("/users", authorization, userController.getUsers);
users.get("/users/:id", authorization, userController.getUserById);
users.patch("/users/:id", authorization, userController.updateUser);
users.patch("/users/:id/avatar", authorization, userController.updateAvatar);

module.exports = users;
