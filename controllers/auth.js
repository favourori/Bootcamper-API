const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

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

  res.status(200).send({ success: true, data: user });
};
