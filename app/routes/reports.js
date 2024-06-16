import express from 'express';
import reportController from '../controllers/ReportController.js';
import lotController from '../controllers/LotController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// router.get('/', auth, reportController.all);
// router.get('/funds/:id', auth, reportController.funds);
router.get('/current-lots', lotController.currentLots);

export default router;