const express = require("express");
const router = express.Router();
const {
  createCustomTourRequest,
  getAllCustomTourRequests,
  getMyCustomTourRequests,
  getCustomTourRequestById,
  acceptCustomTourRequest,
  updateCustomTourRequest,
  deleteCustomTourRequest,
} = require("../controllers/customTourRequestController");

// Middleware to check if user is authenticated
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Tourist routes
router.post("/", protect, authorizeRoles("tourist"), createCustomTourRequest);
router.get(
  "/my-requests",
  protect,
  authorizeRoles("tourist"),
  getMyCustomTourRequests
);
router.get(
  "/my-requests/:id",
  protect,
  authorizeRoles("tourist"),
  getCustomTourRequestById
);
router.put(
  "/my-requests/:id",
  protect,
  authorizeRoles("tourist"),
  updateCustomTourRequest
);
router.delete(
  "/my-requests/:id",
  protect,
  authorizeRoles("tourist"),
  deleteCustomTourRequest
);

// Guide routes
router.get(
  "/",
  protect,
  authorizeRoles("guide", "admin"),
  getAllCustomTourRequests
);
router.get(
  "/:id",
  protect,
  authorizeRoles("guide", "admin"),
  getCustomTourRequestById
);
router.post(
  "/:id/accept",
  protect,
  authorizeRoles("guide"),
  acceptCustomTourRequest
);

// Admin routes (admin can view all requests)
router.get(
  "/admin/all",
  protect,
  authorizeRoles("admin"),
  getAllCustomTourRequests
);
router.get(
  "/admin/:id",
  protect,
  authorizeRoles("admin"),
  getCustomTourRequestById
);

module.exports = router;
