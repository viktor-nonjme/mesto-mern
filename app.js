require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const roures = require("./routes");
const corsOptions = require("./utils/cors");

const { PORT, MONGOO_URL } = process.env;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/api", roures);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту: ${PORT}`);
    });

    mongoose.connect(MONGOO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

start();
