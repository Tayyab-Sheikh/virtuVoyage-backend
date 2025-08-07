const Payment = require("../models/Payment");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate(
      "tour guide tourist",
      "title name email"
    );
    const totalRevenue = payments.reduce((acc, p) => acc + p.platformFee, 0);
    res.json({ totalRevenue, payments });
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};

exports.getGuidePayments = async (req, res) => {
  try {
    const payments = await Payment.find({ guide: req.user.id });
    const totalEarnings = payments.reduce((acc, p) => acc + p.guideEarning, 0);
    res.json({ totalEarnings, payments });
  } catch (err) {
    res.status(500).json({ message: "Error fetching guide payments" });
  }
};
