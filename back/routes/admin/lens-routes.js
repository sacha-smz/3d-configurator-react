const express = require("express");

const textureImgUpload = require("../../middlewares/admin/texture-img-upload");
const textureValidator = require("../../middlewares/admin/texture-validator");
const lensController = require("../../controllers/admin/lens-controller");

const router = express.Router();

router.use((req, res, next) => {
  res.locals = {
    currentDomain: "Verres"
  };
  next();
});

router.get("/", (req, res) => {
  res.render("lenses/index");
});

router.get("/create", lensController.showCreateForm);
router.post("/create", textureImgUpload("lenses"), textureValidator(), lensController.create);

module.exports = router;
