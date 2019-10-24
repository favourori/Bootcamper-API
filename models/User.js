const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please add a name"] },
  email: {
    type: String,
    required: [true, "please add a username"],
    unique: true
  },
  role: { type: String, enum: ["user", "publisher"], default: "user" },
  password: { type: String, required: [true, "please add a password"] },
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpire: String
});

//encrypt password before saving using bcrypt
UserSchema.pre("save", async function(next) {
  //generate salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//sign JWT & Return

module.exports = mongoose.model("User", UserSchema);
