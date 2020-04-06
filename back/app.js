require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const modelsRouter = require("./routes/api/model-routes");
const framesRouter = require("./routes/admin/frame-routes");

mongoose
  .connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(() => console.log("Connexion à MongoDB échouée"));

const app = express();
app.set("views", "./views");
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/models", modelsRouter);
app.use("/admin/frames", framesRouter);

module.exports = app;
