const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const createError = require("http-errors");

// access: private
// purpose: Get tickets of a user
const userTickets = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const tickets = await Ticket.find({
    user: req.user._id,
  });

  if (tickets) {
    res.json(tickets);
  }
});
// access: private
// purpose: Get tickets of a user
const userTicket = asyncHandler(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    res.json(ticket);
  }
});

// access: private
// purpose: Create ticket for a user

const createUserTicket = asyncHandler(async (req, res, next) => {
  const { product, description } = req.body;

  const ticket = await Ticket.create({
    user: req.user._id,
    product,
    description,
  });

  if (ticket) {
    res.json(ticket);
  }
});
const deleteUserTicket = asyncHandler(async (req, res, next) => {
  const { acknowledged } = await Ticket.deleteOne({
    _id: req.params.id,
  });

  if (acknowledged === true) {
    res.json({ message: "Ticket deleted." });
  }
});

module.exports = {
  userTickets,
  userTicket,
  createUserTicket,
  deleteUserTicket,
};
