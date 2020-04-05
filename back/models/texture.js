const mongoose = require("mongoose");

const textureSchema = mongoose.Schema({
  ref: { type: String, required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model("Texture", frameSchema);
