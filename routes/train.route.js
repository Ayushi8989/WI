import express from 'express';
import  {getSeatAvailability, getTrainAvailability, getBookingDetails} from '../controllers/train.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router()

router.get('/', getTrainAvailability);
router.post('/book-seats', authMiddleware, getSeatAvailability);
router.get('/booking/:id', authMiddleware, getBookingDetails);

export default router;