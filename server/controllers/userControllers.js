const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  res.send(req.body);
});

const loginUser = asyncHandler(async (req, res) => {
  res.send("Login user");
});

module.exports = {
  registerUser,
  loginUser,
};
