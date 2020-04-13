require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");

const modelsRouter = require("./routes/api/model-routes");
const fileController = require("./controllers/api/file-controller");

const framesRouter = require("./routes/admin/frame-routes");
const texturesRouter = require("./routes/admin/texture-routes");

mongoose
  .connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(() => console.log("Connexion à MongoDB échouée"));

const app = express();
app.set("views", "./views");
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(/^\/api\/(?:models|textures)\/(?:\w+\/)?\w+(?:-thmb)?\.(?:png|fbx)$/, cors(), fileController.serve);

app.use("/api/models", cors(), modelsRouter);

app.use("/admin/frames", framesRouter);
app.use("/admin/textures", texturesRouter);

module.exports = app;
