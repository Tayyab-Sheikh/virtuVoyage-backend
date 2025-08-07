const stripe = require("../utils/stripe");
const Tour = require("../models/Tour");
const Enrollment = require("../models/Enrollment");

exports.createCheckoutSession = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // Check if already enrolled
    const already = await Enrollment.findOne({
      tour: tour._id,
      tourist: req.user.id,
    });
    if (already) return res.status(400).json({ message: "Already enrolled" });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Tour: ${tour.title}`,
              description: tour.description,
            },
            unit_amount: tour.price * 100, // in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success?tourId=${tour._id}`,
      cancel_url: `${process.env.CLIENT_URL}/tours/${tour._id}`,
      metadata: {
        tourId: tour._id.toString(),
        touristId: req.user.id,
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating Stripe session" });
  }
};
