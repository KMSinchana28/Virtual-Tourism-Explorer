
import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';

// Calculate seats booked for a particular tour and date
const getSeatCounts = async (tourId, date) => {
   const start = new Date(date);
   start.setUTCHours(0, 0, 0, 0);

   const end = new Date(start);
   end.setUTCDate(end.getUTCDate() + 1);

   const result = await Booking.aggregate([
      {
         $match: {
            tourId: tourId,
            bookAt: { $gte: start, $lt: end },
            status: { $ne: 'cancelled' }
         }
      },
      {
         $group: {
            _id: null,
            bookedSeats: { $sum: '$guestSize' }
         }
      }
   ]);

   return result.length ? result[0].bookedSeats : 0;
};

// Check available seats for a selected date
export const getTourAvailability = async (req, res) => {
   try {
      const { tourId } = req.params;
      const { date } = req.query;

      if (!date || isNaN(new Date(date).getTime())) {
         return res.status(400).json({
            success: false,
            message: 'Please select a valid travel date'
         });
      }

      const tour = await Tour.findById(tourId);

      if (!tour) {
         return res.status(404).json({
            success: false,
            message: 'Tour not found'
         });
      }

      const bookedSeats = await getSeatCounts(tour._id, date);
      const availableSeats = Math.max(0, tour.maxGroupSize - bookedSeats);

      return res.status(200).json({
         success: true,
         data: {
            maxGroupSize: tour.maxGroupSize,
            bookedSeats,
            availableSeats
         }
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Could not check availability'
      });
   }
};

// Create new booking
export const createBooking = async (req, res) => {
   try {
      const { tourId, fullName, phone, guestSize, bookAt } = req.body;

      if (!tourId || !fullName || !phone || !bookAt) {
         return res.status(400).json({
            success: false,
            message: 'Please fill in all booking details'
         });
      }

      const guests = Number(guestSize);
      const selectedDate = new Date(bookAt);

      if (!Number.isInteger(guests) || guests < 1) {
         return res.status(400).json({
            success: false,
            message: 'Please enter a valid number of guests'
         });
      }

      if (isNaN(selectedDate.getTime())) {
         return res.status(400).json({
            success: false,
            message: 'Please select a valid travel date'
         });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
         return res.status(400).json({
            success: false,
            message: 'Travel date cannot be in the past'
         });
      }

      const tour = await Tour.findById(tourId);

      if (!tour) {
         return res.status(404).json({
            success: false,
            message: 'Tour not found'
         });
      }

      const bookedSeats = await getSeatCounts(tour._id, bookAt);
      const availableSeats = tour.maxGroupSize - bookedSeats;

      if (guests > availableSeats) {
         return res.status(400).json({
            success: false,
            message: `Only ${Math.max(0, availableSeats)} seats are available for this date`
         });
      }

      const newBooking = new Booking({
         ...req.body,
         userId: req.user.id,
         tourId: tour._id,
         tourName: tour.title,
         guestSize: guests,
         status: 'confirmed'
      });

      const savedBooking = await newBooking.save();

      return res.status(201).json({
         success: true,
         message: 'Your tour is booked!',
         data: savedBooking
      });
   } catch (error) {
      console.error('Booking error:', error);

      return res.status(500).json({
         success: false,
         message: 'Could not create booking'
      });
   }
};

// Get single booking
export const getBooking = async (req, res) => {
   try {
      const book = await Booking.findById(req.params.id);

      if (!book) {
         return res.status(404).json({
            success: false,
            message: 'Booking not found'
         });
      }

      return res.status(200).json({
         success: true,
         message: 'Successful!',
         data: book
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Could not retrieve booking'
      });
   }
};

// Get all bookings
export const getAllBooking = async (req, res) => {
   try {
      const books = await Booking.find();

      return res.status(200).json({
         success: true,
         message: 'Successful!',
         data: books
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Could not retrieve bookings'
      });
   }
};
