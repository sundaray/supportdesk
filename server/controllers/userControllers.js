const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const User = require("../models/userModel");

// access: public
// purpose: register a user
const registerUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const err = new Error("User already registered.");
    err.status = 400;
    next(err);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.json({
    token: generateToken(user._id),
  });
});

// access: public
// purpose: log in a user

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    const err = new Error("Invalid email or password");
    err.status = 401;
    next(err);
  }
});

module.exports = {
  registerUser,
  loginUser,
};
