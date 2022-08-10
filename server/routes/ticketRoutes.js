const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const {
  userTickets,
  userTicket,
  createUserTicket,
} = require("../controllers/ticketControllers");

const router = express.Router();

router.post("/api/users/tickets/create", requireAuth, createUserTicket);
router.get("/api/users/tickets", requireAuth, userTickets);
router.get("/api/users/tickets/:id", requireAuth, userTicket);

module.exports = router;
