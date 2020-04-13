const path = require("path");

const Model = require("../../models/frame");

exports.index = (req, res) => {
  Model.find()
    .populate("textures")
    .then(models => res.status(200).json(models))
    .catch(error => res.status(404).json(error));
};

exports.serveFile = (req, res) => {
  res.sendFile(path.resolve("assets" + req.originalUrl.replace("/api", "")));
};
