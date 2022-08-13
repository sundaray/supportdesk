const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");
const User = require("../models/userModel");
const createError = require("http-errors");

// access: private
// purpose: get the details of users

const usersDetail = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (users) {
    res.json(users);
  }
});

// access: public
// purpose: register a user
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const err = createError(400, "User already registered.");
    next(err);
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  res.json({
    token: generateToken(user._id, user.username),
  });
});

// access: public
// purpose: log in a user

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id, user.username),
    });
  } else {
    const err = createError(401, "Invalid email or password");
    next(err);
  }
});

module.exports = {
  registerUser,
  loginUser,
  usersDetail,
};
