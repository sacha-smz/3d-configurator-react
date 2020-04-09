const { body } = require("express-validator");

module.exports = () => [
  body("ref", "Une référence est requise").exists().bail().notEmpty(),
  body("name", "Un nom est requis").exists().bail().notEmpty(),
  body("price")
    .exists()
    .withMessage("Un prix est requis")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Le prix doit être un nombre valide")
];
