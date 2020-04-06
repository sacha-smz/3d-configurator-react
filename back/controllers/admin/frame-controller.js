const frame = require("../../models/frame");
const formidable = require("formidable");

exports.showCreateForm = (req, res) => {
  res.render("frames/create");
};

exports.create = (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(files);
  });
};
