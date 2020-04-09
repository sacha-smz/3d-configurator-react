const express = require("express");

const frameFilesUpload = require("../../middlewares/admin/frame-files-upload");
const frameValidator = require("../../middlewares/admin/frame-validator");
const frameController = require("../../controllers/admin/frame-controller");

const router = express.Router();

router.use((req, res, next) => {
  res.locals = {
    currentLink: "frames"
  };
  next();
});

router.get("/", (req, res) => {
  res.render("frames/index");
});

router.get("/create", frameController.showCreateForm);
router.post("/create", frameFilesUpload, frameValidator(), frameController.create);

module.exports = router;
