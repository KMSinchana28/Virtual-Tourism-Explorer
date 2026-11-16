
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true
      },
      userEmail: {
         type: String
      },
      tourId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Tour",
         required: true
      },
      tourName: {
         type: String,
         required: true
      },
      fullName: {
         type: String,
         required: true
      },
      guestSize: {
         type: Number,
         required: true,
         min: 1
      },
      phone: {
         type: String,
         required: true
      },
      bookAt: {
         type: Date,
         required: true
      },
      status: {
         type: String,
         enum: ["confirmed", "cancelled"],
         default: "confirmed"
      }
   },
   { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
