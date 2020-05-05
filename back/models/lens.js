const mongoose = require("mongoose");

const lensSchema = mongoose.Schema({
  ref: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true }
});

module.exports = mongoose.model("Lens", lensSchema);
