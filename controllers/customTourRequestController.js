const CustomTourRequest = require("../models/CustomTourRequest");
const User = require("../models/User");
const Tour = require("../models/Tour");

// Create a custom tour request (Tourist)
const createCustomTourRequest = async (req, res) => {
  try {
    const {
      title,
      description,
      preferredDate,
      duration,
      maxTourists,
      budget,
      location,
      specialRequirements,
    } = req.body;

    const customTourRequest = new CustomTourRequest({
      tourist: req.user.id,
      title,
      description,
      preferredDate,
      duration,
      maxTourists,
      budget,
      location,
      specialRequirements,
    });

    await customTourRequest.save();

    res.status(201).json({
      success: true,
      message: "Custom tour request created successfully",
      data: customTourRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating custom tour request",
      error: error.message,
    });
  }
};

// Get all custom tour requests (Admin and Guide)
const getAllCustomTourRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const customTourRequests = await CustomTourRequest.find(query)
      .populate("tourist", "name email")
      .populate("acceptedBy", "name email")
      .populate("tourId", "title price startDate endDate")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await CustomTourRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      data: customTourRequests,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching custom tour requests",
      error: error.message,
    });
  }
};

// Get custom tour requests by tourist (Tourist)
const getMyCustomTourRequests = async (req, res) => {
  try {
    const customTourRequests = await CustomTourRequest.find({
      tourist: req.user.id,
    })
      .populate("acceptedBy", "name email")
      .populate("tourId", "title price startDate endDate")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: customTourRequests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your custom tour requests",
      error: error.message,
    });
  }
};

// Get custom tour request by ID
const getCustomTourRequestById = async (req, res) => {
  try {
    const customTourRequest = await CustomTourRequest.findById(req.params.id)
      .populate("tourist", "name email")
      .populate("acceptedBy", "name email")
      .populate(
        "tourId",
        "title price startDate endDate zoomJoinLink zoomHostLink"
      );

    if (!customTourRequest) {
      return res.status(404).json({
        success: false,
        message: "Custom tour request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: customTourRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching custom tour request",
      error: error.message,
    });
  }
};

// Accept custom tour request (Guide)
const acceptCustomTourRequest = async (req, res) => {
  try {
    const { price, startDate, endDate, zoomJoinLink, zoomHostLink } = req.body;
    const { id } = req.params;

    const customTourRequest = await CustomTourRequest.findById(id);
    if (!customTourRequest) {
      return res.status(404).json({
        success: false,
        message: "Custom tour request not found",
      });
    }

    if (customTourRequest.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This request has already been processed",
      });
    }

    // Check if the user is a guide
    const guide = await User.findById(req.user.id);
    if (guide.role !== "guide" || !guide.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Only approved guides can accept tour requests",
      });
    }

    // Create a new tour based on the custom request
    // const tour = new Tour({
    //   title: customTourRequest.title,
    //   description: customTourRequest.description,
    //   price: price,
    //   startDate: startDate,
    //   endDate: endDate,
    //   maxTourists: customTourRequest.maxTourists,
    //   guide: req.user.id,
    //   zoomJoinLink,
    //   zoomHostLink,
    // });

    // await tour.save();

    // Update the custom tour request
    customTourRequest.status = "accepted";
    customTourRequest.acceptedBy = req.user.id;
    customTourRequest.acceptedAt = new Date();
    customTourRequest.price = price;
    // customTourRequest.tourId = tour._id;

    await customTourRequest.save();

    res.status(200).json({
      success: true,
      message: "Custom tour request accepted successfully",
      data: {
        customTourRequest,
        // tour,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error accepting custom tour request",
      error: error.message,
    });
  }
};

// Update custom tour request (Tourist)
const updateCustomTourRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const customTourRequest = await CustomTourRequest.findById(id);
    if (!customTourRequest) {
      return res.status(404).json({
        success: false,
        message: "Custom tour request not found",
      });
    }

    // Only the tourist who created the request can update it
    if (customTourRequest.tourist.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own custom tour requests",
      });
    }

    // Only allow updates if the request is still pending
    if (customTourRequest.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot update a request that has been processed",
      });
    }

    const updatedRequest = await CustomTourRequest.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("tourist", "name email");

    res.status(200).json({
      success: true,
      message: "Custom tour request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating custom tour request",
      error: error.message,
    });
  }
};

// Delete custom tour request (Tourist)
const deleteCustomTourRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const customTourRequest = await CustomTourRequest.findById(id);
    if (!customTourRequest) {
      return res.status(404).json({
        success: false,
        message: "Custom tour request not found",
      });
    }

    // Only the tourist who created the request can delete it
    if (customTourRequest.tourist.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own custom tour requests",
      });
    }

    // Only allow deletion if the request is still pending
    if (customTourRequest.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete a request that has been processed",
      });
    }

    await CustomTourRequest.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Custom tour request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting custom tour request",
      error: error.message,
    });
  }
};

module.exports = {
  createCustomTourRequest,
  getAllCustomTourRequests,
  getMyCustomTourRequests,
  getCustomTourRequestById,
  acceptCustomTourRequest,
  updateCustomTourRequest,
  deleteCustomTourRequest,
};
