const Card = require("../models/card");
const { validationResult } = require("express-validator");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-error");

const verifyCardAndSend = (card, res) => {
  if (!card) {
    throw new NotFoundError("Нет карточки с таким id");
  }

  return res.send(card);
};

const getCards = (req, res, next) => {
  return Card.find({})
    .populate("cards.owner")
    .then((cards) => {
      res.json(cards);
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new BadRequestError(errors.array()[0].msg));
  }

  const { name, link, likes } = req.body;

  const user = req.user._id;

  return Card.create({ name, link, owner: user, likes })
    .then((card) => {
      res.status(201).json(card);
    })
    .catch(() => next(new BadRequestError("Ошибка при создании карточки")));
};

const deleteCard = (req, res, next) => {
  const user = req.user._id;

  Card.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError("Нет карточки с таким id");
    })
    .then((card) => {
      if (card.owner.toString() !== user) {
        res.status(403).send("Не хватает прав");
      }
      return Card.findByIdAndDelete(req.params.id)
        .then((cardById) => {
          res.send(cardById);
        })
        .catch(next);
    })
    .catch(next);
};

const changeLikeStatus = async (req, res, next) => {
  const cardId = req.params.id;
  const user = req.user._id;
  const update = { likes: user };

  const card = await Card.findById(cardId);

  if (!card) {
    return new NotFoundError("Нет карточки с таким id");
  }

  const isLiked = card.likes.some((c) => c._id.toString() === user);

  if (isLiked) {
    return Card
      .findByIdAndUpdate(cardId, { $pull: update }, { new: true })
      .then((card) => verifyCardAndSend(card, res))
      .catch(next);
  }

  return Card
    .findByIdAndUpdate(cardId, { $addToSet: update }, { new: true })
    .then((card) => verifyCardAndSend(card, res))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  changeLikeStatus,
};
