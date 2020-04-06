const fs = require("fs");
const path = require("path");

exports.index = (req, res) => {
  try {
    const modelsPath = path.resolve("assets/models");
    const files = fs.readdirSync(modelsPath).filter((file) => fs.lstatSync(path.join(modelsPath, file)).isDirectory());
    if (!Array.isArray(files) || files.length === 0) {
      return res.status(404).json({ error: "Aucun modèle à afficher" });
    }
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.serveFile = (req, res) => {
  res.sendFile(path.resolve("assets" + req.originalUrl.replace("/api", "")));
};
