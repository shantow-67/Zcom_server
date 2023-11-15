const express = require("express");
const {
  Registration,
  Login,
  verifyEmail,
  verifyOTP,
} = require("../controller/userController");
const AuthVerification = require("../middleware/AuthVerification");
const router = express.Router();

router.post("/registration", Registration);

router.post("/login", Login);

router.get("/verifyEmail/:email", verifyEmail);

router.get("/verifyOTP/:email/:otp", verifyOTP);

module.exports = router;
