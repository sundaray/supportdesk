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
  } else {
    const err = createError(400, "Users not found");
    next(err);
  }
});

// access: public
// purpose: register a user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const err = createError(400, "User already registered.");
    next(err);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.json({
    token: generateToken(user._id, user.name),
  });
});

// access: public
// purpose: log in a user

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id, user.name),
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
