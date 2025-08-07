const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/stripeController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Only tourists can pay
router.post(
  "/checkout/:tourId",
  protect,
  authorizeRoles("tourist"),
  createCheckoutSession
);

module.exports = router;
