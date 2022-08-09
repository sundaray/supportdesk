const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const createError = require("http-errors");

// access: private
// purpose: Get tickets of a user
const userTickets = asyncHandler(async (req, res, next) => {});
// access: private
// purpose: Get tickets of a user
const userTicket = asyncHandler(async (req, res, next) => {
  const tickets = await Ticket.find({ id: req.params.id, user: req.user.id });

  if (!tickets) {
    const err = createError(400, "Tickets not found.");
    next(err);
  }
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
  userTicket,
  createUserTicket,
};
