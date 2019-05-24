const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paletteSchema = new Schema({
  swatches: {
    type: Array,
    required: true
  },
  palette_name: {
    type: String,
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "image"
  }
});

const paletteModel = mongoose.model("Palette", paletteSchema);

module.exports = paletteModel;