const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const {
  userTickets,
  createUserTicket,
} = require("../controllers/ticketControllers");

const router = express.Router();

router.get("/api/users/tickets", requireAuth, userTickets);
router.post("/api/users/tickets/create", requireAuth, createUserTicket);

module.exports = router;
