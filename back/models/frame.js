const mongoose = require("mongoose");

const frameSchema = mongoose.Schema({
  ref: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  textures: [{ type: mongoose.ObjectId, ref: "Texture" }]
});

module.exports = mongoose.model("Frame", frameSchema);
