const mongoose = require("mongoose");

const frameSchema = mongoose.Schema({
  ref: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  textures: [{ type: mongoose.ObjectId, ref: "Texture" }],
  lenses: [{ type: mongoose.ObjectId, ref: "Lens" }]
});

module.exports = mongoose.model("Frame", frameSchema);
