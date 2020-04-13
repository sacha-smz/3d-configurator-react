const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

const { validationResult } = require("express-validator");
const validResult = validationResult.withDefaults({
  formatter: error => ({
    field: error.param,
    message: error.msg
  })
});

const Texture = require("../../models/texture");

exports.showCreateForm = (req, res) => {
  res.render("textures/create");
};

exports.create = (req, res, next) => {
  const errors = validResult(req);
  if (!errors.isEmpty()) {
    return res.render("textures/create", { errors: errors.array() });
  }

  Texture.create({ ...req.body })
    .then(texture => {
      const { ref, name } = req.body;

      const mimeMap = {
        "image/jpeg": ".jpg",
        "image/png": ".png"
      };

      const destPath = `assets/textures/${ref}`;
      const extension = mimeMap[req.file.mimetype];

      try {
        fs.renameSync(req.file.path, destPath + extension);
      } catch (err) {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        console.log(err);
        return res.status(500).render("textures/create", {
          errors: [{ message: "Une erreur est survenue lors de l'écriture des fichiers" }]
        });
      }

      Jimp.read(destPath + extension)
        .then(image => {
          const thmbSize = 128;
          const startX = (image.bitmap.width - thmbSize) / 2;
          const startY = image.bitmap.height / 2;
          image.crop(startX, startY, thmbSize, thmbSize).write(destPath + "-thmb" + extension);
        })
        .catch(err => {
          console.log(err);
        });

      res.render("textures/create", {
        success: `Le coloris ${name} (ref. ${ref}) a bien été enregistré`
      });
    })
    .catch(err => {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      console.log(err);
      res.status(500).render("textures/create", {
        errors: [{ message: "Une erreur est survenue, la texture n'a pas pu être enregistrée" }]
      });
    });
};
