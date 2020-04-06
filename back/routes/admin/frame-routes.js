const express = require("express");

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
router.post("/create", frameController.create);

module.exports = router;
