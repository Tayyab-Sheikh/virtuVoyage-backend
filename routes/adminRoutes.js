const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  approveGuide,
  getDashboardStats,
} = require("../controllers/adminController");
const { getAllPayments } = require("../controllers/paymentController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// All admin routes require admin login
router.use(protect, authorizeRoles("admin"));

// Get all users (optional role filter)
router.get("/users", getAllUsers);

// Approve a guide
router.put("/approve/:id", approveGuide);

// Dashboard stats
router.get("/dashboard", getDashboardStats);

router.get("/payments", getAllPayments);

module.exports = router;
