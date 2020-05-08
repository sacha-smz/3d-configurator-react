const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const { validationResult } = require("express-validator");
const validResult = validationResult.withDefaults({
  formatter: error => ({
    message: error.msg
  })
});

const Frame = require("../../models/frame");
const Texture = require("../../models/texture");
const Lens = require("../../models/lens");

exports.index = (req, res) => {
  Frame.find()
    .then(frames => {
      res.render("frames/index", { frames });
    })
    .catch(err => {
      console.log(err);
      res.status(404).render("frames/index", { errors: [{ message: `Une erreur est survenue : ${err.message}` }] });
    });
};

exports.showCreateForm = (req, res) => {
  res.render("frames/create");
};

exports.create = (req, res, next) => {
  const errors = validResult(req);
  if (!errors.isEmpty()) {
    return res.render("frames/create", { errors: errors.array() });
  }

  Frame.create({ ...req.body })
    .then(frame => {
      const { ref, name } = req.body;
      try {
        const destDir = `assets/models/${ref}`;
        fs.mkdirSync(destDir);
        req.files.forEach(file => {
          fs.renameSync(file.path, path.join(destDir, file.originalname));
        });
      } catch (err) {
        req.files.forEach(file => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
        console.log(err);
        return res.status(500).render("frames/create", {
          errors: [{ message: "Une erreur est survenue lors de l'écriture des fichiers" }]
        });
      }

      res.render("frames/create", {
        success: `Le modèle ${name} (ref. ${ref}) a bien été enregistré`
      });
    })
    .catch(err => {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
      console.log(err);
      res.status(500).render("frames/create", {
        errors: [{ message: "Une erreur est survenue, le modèle n'a pas pu être enregistré" }]
      });
    });
};

exports.get = (req, res) => {
  Frame.findOne({ ref: req.params.ref })
    .populate("textures")
    .populate("lenses")
    .then(frame => {
      Texture.find().then(textures => {
        const availableTextures = textures.filter(
          texture => !frame.textures.some(frameTexture => frameTexture.ref == texture.ref)
        );
        Lens.find().then(lenses => {
          const availableLenses = lenses.filter(lens => !frame.lenses.some(frameLens => frameLens.ref == lens.ref));

          let errors = null;
          if (req.query.err) {
            errors = JSON.parse(req.query.err);
          }
          res.render("frames/update", {
            frame,
            availableTextures,
            availableLenses,
            errors,
            success: req.query.success
          });
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).redirect("back");
    });
};

exports.update = (req, res) => {
  const errors = validResult(req);
  if (!errors.isEmpty()) {
    const err = encodeURIComponent(JSON.stringify(errors.array()));
    return res.redirect(`/admin/frames/${req.params.ref}?err=${err}`);
  }

  Frame.findOneAndUpdate({ ref: req.params.ref }, { ...req.body })
    .then(frame => {
      res.redirect(
        `/admin/frames/${req.params.ref}?success=${encodeURIComponent("La monture a bien été mise à jour")}`
      );
    })
    .catch(err => {
      const errors = encodeURIComponent(JSON.stringify([{ message: `La mise à jour a échoué : ${err.message}` }]));
      res.status(404).redirect(`/admin/frames/${req.params.ref}?err=${errors}`);
    });
};

exports.addTexture = (req, res) => {
  Texture.findById(req.params.id).then(texture => {
    Frame.findOne({ ref: req.params.ref }).then(frame => {
      const update = frame.textures.find(textureId => textureId.equals(texture._id))
        ? { $pull: { textures: texture._id } }
        : { $addToSet: { textures: texture._id } };
      frame.updateOne(update).then(() => {
        res.redirect(`/admin/frames/${frame.ref}`);
      });
    });
  });
};

exports.addLens = (req, res) => {
  Lens.findById(req.params.id).then(lens => {
    Frame.findOne({ ref: req.params.ref }).then(frame => {
      const update = frame.lenses.find(lensId => lensId.equals(lens._id))
        ? { $pull: { lenses: lens._id } }
        : { $addToSet: { lenses: lens._id } };
      frame.updateOne(update).then(() => {
        res.redirect(`/admin/frames/${frame.ref}`);
      });
    });
  });
};
