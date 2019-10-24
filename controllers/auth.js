const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc     POST register user
// @Route    GET /api/v1/auth/register
// @Access   Public
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  const token = jwt.sign({ name, email, role }, process.env.JWT_SECRET);

  res
    .header("auth-token", token)
    .status(200)
    .send({ success: true, token: token });
};
