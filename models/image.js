const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageSchema = new Schema({
  link : {
    type: String,
    required: true,
  }, 
  credit : {
    type: String,
  },
  category : {
    type: Array,
  }
});

const imageModel = mongoose.model("image", imageSchema );

module.exports = imageModel;
