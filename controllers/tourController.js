const Tour = require("../models/Tour");

// Create a tour
exports.createTour = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      startDate,
      endDate,
      maxTourists,
      images,
    } = req.body;

    const tour = new Tour({
      title,
      description,
      price,
      startDate,
      endDate,
      maxTourists,
      images,
      guide: req.user.id,
    });

    await tour.save();
    res.status(201).json({ message: "Tour created successfully", tour });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating tour" });
  }
};

// Get guide's own tours
exports.getMyTours = async (req, res) => {
  try {
    const tours = await Tour.find({ guide: req.user.id });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tours" });
  }
};

// Update a tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findOne({ _id: req.params.id, guide: req.user.id });

    if (!tour) return res.status(404).json({ message: "Tour not found" });

    Object.assign(tour, req.body);
    await tour.save();

    res.json({ message: "Tour updated", tour });
  } catch (err) {
    res.status(500).json({ message: "Error updating tour" });
  }
};

// Delete a tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndDelete({
      _id: req.params.id,
      guide: req.user.id,
    });

    if (!tour)
      return res
        .status(404)
        .json({ message: "Tour not found or already deleted" });

    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting tour" });
  }
};
