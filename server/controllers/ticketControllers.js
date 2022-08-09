const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const createError = require("http-errors");

// access: private
// purpose: Get tickets of a user
const userTickets = asyncHandler(async (req, res, next) => {
  res.json({ message: "Here are your tickets." });
});

// access: private
// purpose: Create ticket for a user

const createUserTicket = asyncHandler(async (req, res, next) => {
  res.json({
    message: "Here is the ticket.",
  });
});

module.exports = {
  userTickets,
  createUserTicket,
};
