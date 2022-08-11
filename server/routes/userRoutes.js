const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  usersDetail,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/api/users/all", requireAuth, usersDetail);
router.post("/api/users/register", registerUser);
router.post("/api/users/loginn", loginUser);

module.exports = router;
