import express from 'express';
import reportController from '../controllers/ReportController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/funds', auth, reportController.funds);

export default router;