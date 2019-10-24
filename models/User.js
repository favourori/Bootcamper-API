const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please add a name"] },
  email: { type: String, required: [true, "please add a username"] },
  role: { type: String, enum: ["user", "publisher"], default: "user" },
  password: { type: String, required: [true, "please add a password"] },
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpire: String
});

module.exports = mongoose.model("User", UserSchema);
