
import express from 'express'
import {
   createReview,
   getReviewEligibility
} from '../Controllers/reviewController.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

// Check whether the logged-in user can review this tour
router.get('/eligibility/:tourId', verifyToken, getReviewEligibility)

// Submit a review
router.post('/:tourId', verifyToken, createReview)

export default router
