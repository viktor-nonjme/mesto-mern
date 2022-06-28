const router = require("express").Router();
const cardController = require("../controllers/cards");
const { cardValidator } = require("../utils/validators");
const { authorization } = require("../middlewares/auth");

router.get("/cards", cardController.getCards);
router.delete("/cards/:id", authorization, cardController.deleteCard);
router.post("/cards", authorization, cardValidator, cardController.createCard);
router.put("/cards/:id/likes", authorization, cardController.changeLikeStatus);

module.exports = router;
