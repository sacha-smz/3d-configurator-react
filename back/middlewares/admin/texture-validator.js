const { body } = require("express-validator");

module.exports = () => [
  body("ref", "Une référence est requise").exists().bail().notEmpty(),
  body("name", "Un nom est requis").exists().bail().notEmpty()
];
