const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const Texture = require("../../models/texture");

exports.showCreateForm = (req, res) => {
  res.render("textures/create");
};

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("textures/create", { errors: errors.array() });
    return;
  }

  Texture.create({ ...req.body })
    .then((texture) => {
      const { ref, name } = req.body;
      try {
        const mimeMap = {
          "image/jpeg": ".jpg",
          "image/png": ".png"
        };
        fs.renameSync(req.file.path, path.join("assets/textures", ref + mimeMap[req.file.mimetype]));
      } catch (err) {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        console.log(err);
        res
          .status(500)
          .render("textures/create", { errors: [{ msg: "Une erreur est survenue lors de l'écriture des fichiers" }] });
        return;
      }

      res.render("textures/create", {
        success: `Le coloris ${name} (ref. ${ref}) a bien été enregistré`
      });
    })
    .catch((err) => {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      console.log(err);
      res.status(500).render("textures/create", {
        errors: [{ msg: "Une erreur est survenue, la texture n'a pas pu être enregistrée" }]
      });
    });
};
