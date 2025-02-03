import express from 'express';
import adminMiddleware from '../middlewares/admin.middleware.js';
import { addTrain } from '../controllers/admin.controller.js';

const router = express.Router()

router.post('/add-train', adminMiddleware, addTrain);

export default router;