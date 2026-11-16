
import express from 'express';

import {
   createBooking,
   getAllBooking,
   getBooking,
   getTourAvailability
} from '../Controllers/bookingController.js';

import {
   verifyAdmin,
   verifyUser,
   verifyToken
} from '../utils/verifyToken.js';

const router = express.Router();

router.get('/availability/:tourId', getTourAvailability);
router.post('/', verifyToken, createBooking);
router.get('/:id', verifyUser, getBooking);
router.get('/', verifyAdmin, getAllBooking);

export default router;
