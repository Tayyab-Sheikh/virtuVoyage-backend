const express = require("express");
const router = express.Router();
const {
  createNotificationController,
  getNotificationsByGuide,
  getNotificationsByTourist,
  updateNotification,
} = require("../controllers/notificationController");

// Create a new notification
router.post("/", createNotificationController);

// Get notifications for a specific guide
router.get("/guide/:guideId", getNotificationsByGuide);

// Get notifications for a specific tourist
router.get("/tourist/:touristId", getNotificationsByTourist);

router.put("/:notificationId", updateNotification);

module.exports = router;
