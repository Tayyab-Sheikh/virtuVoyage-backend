const Notification = require("../models/notification");

// Create notification
exports.createNotificationController = async (req, res) => {
  try {
    const { guideId, touristId, message, type } = req.body;

    if (!guideId || !touristId || !message) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }

    const notification = new Notification({
      guideId,
      touristId,
      message,
      type,
    });

    notification.save();

    return res.status(201).json({
      status: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Get notifications by guideId
exports.getNotificationsByGuide = async (req, res) => {
  try {
    const { guideId } = req.params;
    const notifications = await Notification.find({ guideId });

    return res.status(200).json({
      status: true,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// Get notifications by touristId
exports.getNotificationsByTourist = async (req, res) => {
  try {
    const { touristId } = req.params;
    const notifications = await Notification.find({ touristId });

    return res.status(200).json({
      status: true,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(notificationId, {
      isRead: true,
    });

    return res.status(200).json({
      status: true,
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
