const fs = require("fs");
const multer = require("multer");

module.exports = dir => (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "tmp/assets/" + dir);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error("Le format du fichier est incompatible"));
  };

  const upload = multer({ storage, fileFilter }).single("img");

  upload(req, res, err => {
    if (err) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      console.log(err);
      return res.status(500).redirect("back");
    }
    next();
  });
};
