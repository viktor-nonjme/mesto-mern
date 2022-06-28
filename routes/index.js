const router = require("express").Router();
const cards = require("./cards");
const users = require("./users");
const error = require("./error");
const handleErrors = require("../middlewares/handlerErrors");
const { requestLogger, errorLogger } = require("../middlewares/logger");

router.use(requestLogger);
router.use(cards)
router.use(users)
router.use(error)
router.use(handleErrors)
router.use(errorLogger);

module.exports = router;