const express = require("express");
const router = express.Router();
const {
  getGuideDashboard,
  getTouristDashboard,
} = require("../controllers/dashboardController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/guide", protect, authorizeRoles("guide"), getGuideDashboard);
router.get("/tourist", protect, authorizeRoles("tourist"), getTouristDashboard);

module.exports = router;
