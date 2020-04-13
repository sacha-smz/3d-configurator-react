const fs = require("fs");
const multer = require("multer");

module.exports = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "tmp/assets/models");
    }
  });

  const upload = multer({ storage }).array("file", 3);

  upload(req, res, err => {
    if (err) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
      console.log(err);
      return res.status(500).redirect("back");
    }
    next();
  });
};
