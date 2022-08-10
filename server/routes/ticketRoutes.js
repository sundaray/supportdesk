const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const {
  userTickets,
  userTicket,
  createUserTicket,
  deleteUserTicket,
} = require("../controllers/ticketControllers");

const router = express.Router();

router.get("/api/users/tickets", requireAuth, userTickets);
router.get("/api/users/tickets/:id", requireAuth, userTicket);
router.post("/api/users/tickets/create", requireAuth, createUserTicket);
router.delete("/api/users/tickets/:id", requireAuth, deleteUserTicket);

module.exports = router;
