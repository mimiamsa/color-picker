const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    enum : ["still life", "human","warm", "cold", "nature"], 
    required: true,
  }
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
