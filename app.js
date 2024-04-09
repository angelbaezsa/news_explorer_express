const express = require("express");

require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://localhost:27017/news_explorer_db", (r) =>
  console.log(`DataBase error ${r}`)
);

app.use(cors());
app.use(requestLogger);
app.use(express.json());

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
