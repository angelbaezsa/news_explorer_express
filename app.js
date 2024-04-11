const express = require("express");
const helmet = require("helmet");

require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

const { limiter } = require("./utils/limiter");

const DATABASESTRING = process.env.DATABASE;

mongoose.connect(DATABASESTRING, (r) => console.log(`DataBase error ${r}`));

app.use(cors());
app.use(requestLogger);
app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(limiter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
