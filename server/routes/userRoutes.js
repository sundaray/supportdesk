const express = require("express");

const { registerUser, loginUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);

module.exports = router;
