const express = require("express");
const path = require("path");

const router = express.Router();
const cors = require("cors");

const modelController = require("../controllers/model-controller");

router.use(cors());

router.get(/^\/\w+\/\w+\.((png)|(fbx))$/, modelController.serveFile);
router.get("/", modelController.index);

module.exports = router;
