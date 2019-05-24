const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  city : {
    type: String,
    required: true
  },
  palette_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Palette"
    }
  ],
  
});

userSchema.index({ email: 1 }, { unique: true }); // ensure unique email
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
