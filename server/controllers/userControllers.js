const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// access: public
// purpose: register a user
const registerUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  // Check if the user already exists

  const userExists = await User.findOne({ email });

  // If the user exists, then send an error message
  if (userExists) {
    const err = new Error("User already registered.");
    err.status = 400;
    next(err);
  }

  // if the user does not exist, then create a user and save the user in the database
  const user = await User.create({
    name,
    email,
    password,
  });

  // return the details of the registered user
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

// access: public
// purpose: log in a user

const loginUser = asyncHandler(async (req, res) => {
  res.send("Login user");
});

module.exports = {
  registerUser,
  loginUser,
};
