const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const Frame = require("../../models/frame");

exports.showCreateForm = (req, res) => {
  res.render("frames/create");
};

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("frames/create", { errors: errors.array() });
    return;
  }

  Frame.create({ ...req.body })
    .then((frame) => {
      const { ref, name } = req.body;
      try {
        const destDir = `assets/models/${ref}`;
        fs.mkdirSync(destDir);
        req.files.forEach((file) => {
          fs.renameSync(file.path, path.join(destDir, file.originalname));
        });
      } catch (err) {
        req.files.forEach((file) => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
        console.log(err);
        res
          .status(500)
          .render("frames/create", { errors: [{ msg: "Une erreur est survenue lors de l'écriture des fichiers" }] });
        return;
      }

      res.render("frames/create", {
        success: `Le modèle ${name}, ref. ${ref} a bien été enregistré`
      });
    })
    .catch((err) => {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
      console.log(err);
      res.status(500).render("frames/create", {
        errors: [{ msg: "Une erreur est survenue, le modèle n'a pas pu être enregistré" }]
      });
    });
};
