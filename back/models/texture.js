const mongoose = require("mongoose");

const textureSchema = mongoose.Schema({
  ref: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true }
});

module.exports = mongoose.model("Texture", textureSchema);
