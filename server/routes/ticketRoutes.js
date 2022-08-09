const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const {
  userTickets,
  userTicket,
  createUserTicket,
} = require("../controllers/ticketControllers");

const router = express.Router();

router.get("/api/users/tickets", requireAuth, userTickets);
router.get("/api/users/tickets/:id", requireAuth, userTicket);
router.post("/api/users/tickets/create", requireAuth, createUserTicket);

module.exports = router;
