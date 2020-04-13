const express = require("express");
const path = require("path");

const router = express.Router();

const modelController = require("../../controllers/api/model-controller");

router.get("/", modelController.index);

module.exports = router;
