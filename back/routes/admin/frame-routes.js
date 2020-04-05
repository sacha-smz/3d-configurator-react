const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("frame", {
    date: new Date().toLocaleString("fr", {
      hourCycle: "h24",
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }),
    currentLink: "frames"
  });
});

module.exports = router;
