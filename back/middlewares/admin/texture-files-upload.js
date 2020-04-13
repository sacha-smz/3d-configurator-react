const fs = require("fs");
const multer = require("multer");

module.exports = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "tmp/assets/textures");
    }
  });

  const fileFilter = (req, file, cb) => {
    const acceptFile = ["image/jpeg", "	image/png"].includes(file.mimetype);
    cb(null, acceptFile);
  };

  const upload = multer({ storage }).single("img");

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
