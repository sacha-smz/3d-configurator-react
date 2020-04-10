const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");
const validResult = validationResult.withDefaults({
  formatter: (error) => ({
    message: error.msg
  })
});

const Frame = require("../../models/frame");

exports.index = (req, res) => {
  Frame.find()
    .then((frames) => {
      res.render("frames/index", { frames });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("frames/index", { error: `Une erreur est survenue : ${err.message}` });
    });
};

exports.showCreateForm = (req, res) => {
  res.render("frames/create");
};

exports.create = (req, res, next) => {
  const errors = validResult(req);
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
        res.status(500).render("frames/create", {
          errors: [{ message: "Une erreur est survenue lors de l'écriture des fichiers" }]
        });
        return;
      }

      res.render("frames/create", {
        success: `Le modèle ${name} (ref. ${ref}) a bien été enregistré`
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
        errors: [{ message: "Une erreur est survenue, le modèle n'a pas pu être enregistré" }]
      });
    });
};

exports.get = (req, res) => {
  Frame.findOne({ ref: req.params.ref })
    .then((frame) => {
      let errors = null;
      if (req.query.err) {
        errors = JSON.parse(req.query.err);
      }
      res.render("frames/update", { frame, errors });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).redirect("back");
    });
};

exports.update = (req, res) => {
  const errors = validResult(req);
  if (!errors.isEmpty()) {
    const err = encodeURIComponent(JSON.stringify(errors.array()));
    res.redirect(`/admin/frames/${req.body.ref}?err=${err}`);
    return;
  }

  Frame.findOne({ ref: req.params.ref })
    .then((frame) => {
      frame.set({ ...req.body });
      frame.save().then((frame) => {
        res.render("frames/update", { frame, success: "La monture a bien été mise à jour" });
      });
    })
    .catch((err) => {
      const errors = encodeURIComponent(JSON.stringify([{ message: `La mise à jour a échoué : ${err.message}` }]));
      res.status(404).redirect(`/admin/frames/${req.body.ref}?err=${errors}`);
    });
};
