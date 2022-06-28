module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    const { statusCode = 500, message } = err;

    return res.status(statusCode).send({
      message: statusCode === 500 ? "На сервере произошла ошибка" : message,
    });
  }
  return res.status(err.statusCode).send({ message: err.message });
};
