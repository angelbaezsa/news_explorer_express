const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/news_explorer_db", (r) =>
  console.log(`DataBase error ${r}`)
);

app.listen(PORT, () => console.log(`app listening in port: ${PORT}`));
