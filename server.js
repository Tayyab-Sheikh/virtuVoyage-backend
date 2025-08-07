// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const tourRoutes = require("./routes/tourRoutes");
const touristRoutes = require("./routes/touristRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const zoomRoutes = require("./routes/zoomRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const customTourRequestRoutes = require("./routes/customTourRequestRoutes");
// const stripeRoutes = require("./routes/stripeRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/tourist", touristRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/zoom", zoomRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/custom-tour-requests", customTourRequestRoutes);
// app.use("/api/stripe", stripeRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
