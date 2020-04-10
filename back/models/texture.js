const mongoose = require("mongoose");

const textureSchema = mongoose.Schema({
  ref: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model("Texture", textureSchema);
