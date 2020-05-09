require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const modelsRouter = require("./routes/api/model-routes");
const fileController = require("./controllers/api/file-controller");

const framesRouter = require("./routes/admin/frame-routes");
const texturesRouter = require("./routes/admin/texture-routes");
const lensesRouter = require("./routes/admin/lens-routes");

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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve("public")));

app.use(
  /^\/api\/(?:models|textures|envmap|lenses)\/(?:\w+\/)?\w+(?:-thmb)?\.(?:png|fbx)$/,
  cors(),
  fileController.serve
);

app.use("/api/models", cors(), modelsRouter);

app.locals.navLinks = [
  { url: "/", label: "<i class='fas fa-home'></i>" },
  { url: "/admin/frames", label: "Montures" },
  { url: "/admin/textures", label: "Textures" },
  { url: "/admin/lenses", label: "Verres" }
];

app.use("/admin/frames", framesRouter);
app.use("/admin/textures", texturesRouter);
app.use("/admin/lenses", lensesRouter);

module.exports = app;
