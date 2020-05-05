const fs = require("fs");
const { validationResult } = require("express-validator");

const Lens = require("../../models/lens");

const validResult = validationResult.withDefaults({
  formatter: error => ({
    field: error.param,
    message: error.msg
  })
});

exports.showCreateForm = (req, res) => {
  res.render("lenses/create");
};

exports.create = (req, res) => {
  const errors = validResult(req);
  if (!errors.isEmpty()) {
    return res.render("textures/create", { errors: errors.array() });
  }
  Lens.create({ ...req.body })
    .then(() => {
      const { ref, name } = req.body;

      const mimeMap = {
        "image/jpeg": ".jpg",
        "image/png": ".png"
      };

      const destPath = `assets/lenses/${ref}`;
      const extension = mimeMap[req.file.mimetype];

      try {
        fs.renameSync(req.file.path, destPath + extension);
      } catch (err) {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        console.log(err);
        return res.status(500).render("lenses/create", {
          errors: [{ message: "Une erreur est survenue lors de l'écriture des fichiers" }]
        });
      }

      res.render("lenses/create", {
        success: `Le verre ${name} (ref. ${ref}) a bien été enregistré`
      });
    })
    .catch(err => {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      console.log(err);
      res.status(500).render("lenses/create", {
        errors: [{ message: "Une erreur est survenue, le verre n'a pas pu être enregistrée" }]
      });
    });
};
