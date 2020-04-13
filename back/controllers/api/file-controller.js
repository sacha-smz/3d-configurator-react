const path = require("path");

exports.serve = (req, res) => {
  res.sendFile(path.resolve("assets" + req.originalUrl.replace("/api", "")));
};
