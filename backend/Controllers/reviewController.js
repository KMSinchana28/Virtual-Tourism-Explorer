
import Tour from "../models/Tour.js";
import Review from "../models/Review.js";
import Booking from "../models/Booking.js";

// Check whether the logged-in user is eligible to review
export const getReviewEligibility = async (req, res) => {
  try {
    const { tourId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      tourId,
      userId,
      status: { $ne: "cancelled" }
    }).sort({ bookAt: -1 });

    if (!booking) {
      return res.status(403).json({
        success: false,
        canReview: false,
        message: "You must book this tour before submitting a review."
      });
    }

    // Allow reviews only after the complete travel date has passed
    const travelDate = new Date(booking.bookAt);
    travelDate.setHours(23, 59, 59, 999);

    if (new Date() <= travelDate) {
      return res.status(403).json({
        success: false,
        canReview: false,
        message: "You can submit a review only after completing your trip."
      });
    }

    const existingReview = await Review.findOne({
      productId: tourId,
      userId
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        canReview: false,
        message: "You have already reviewed this tour."
      });
    }

    return res.status(200).json({
      success: true,
      canReview: true,
      message: "You can submit your review."
    });

  } catch (error) {
    console.error("Review eligibility error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to check review eligibility."
    });
  }
};


// Create a review
export const createReview = async (req, res) => {
  try {
    const { tourId } = req.params;
    const userId = req.user.id;
    const { reviewText, rating } = req.body;

    if (!reviewText || !reviewText.trim() || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid review text and rating."
      });
    }

    // Verify that the user booked this tour
    const booking = await Booking.findOne({
      tourId,
      userId,
      status: { $ne: "cancelled" }
    }).sort({ bookAt: -1 });

    if (!booking) {
      return res.status(403).json({
        success: false,
        message: "You must book this tour before reviewing it."
      });
    }

    // Verify that the travel date has passed
    const travelDate = new Date(booking.bookAt);
    travelDate.setHours(23, 59, 59, 999);

    if (new Date() <= travelDate) {
      return res.status(403).json({
        success: false,
        message: "You can submit a review only after completing your trip."
      });
    }

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({
      productId: tourId,
      userId
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this tour."
      });
    }

    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found."
      });
    }

    const newReview = new Review({
      productId: tourId,
      userId,
      username: req.user.username || req.body.username,
      reviewText: reviewText.trim(),
      rating
    });

    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id }
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      data: savedReview
    });

  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit review."
    });
  }
};
