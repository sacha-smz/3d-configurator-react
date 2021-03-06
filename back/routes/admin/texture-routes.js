const express = require("express");

const textureImgUpload = require("../../middlewares/admin/texture-img-upload");
const textureValidator = require("../../middlewares/admin/texture-validator");
const textureController = require("../../controllers/admin/texture-controller");

const router = express.Router();

router.use((req, res, next) => {
  res.locals = {
    currentDomain: "Textures"
  };
  next();
});

router.get("/", (req, res) => {
  res.render("textures/index");
});

router.get("/create", textureController.showCreateForm);
router.post("/create", textureImgUpload("textures"), textureValidator(), textureController.create);

module.exports = router;
