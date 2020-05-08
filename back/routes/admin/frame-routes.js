const express = require("express");

const frameFilesUpload = require("../../middlewares/admin/frame-files-upload");
const frameValidator = require("../../middlewares/admin/frame-validator");
const frameController = require("../../controllers/admin/frame-controller");

const router = express.Router();

router.use((req, res, next) => {
  res.locals = {
    currentDomain: "Montures"
  };
  next();
});

router.get("/", frameController.index);

router
  .route("/create")
  .get(frameController.showCreateForm)
  .post(frameFilesUpload, frameValidator(), frameController.create);

router.route("/:ref").get(frameController.get).post(frameValidator(), frameController.update);

router.get("/:ref/texture/:id", frameController.addTexture);
router.get("/:ref/lens/:id", frameController.addLens);

module.exports = router;
