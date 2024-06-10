import express from 'express';
import reportController from '../controllers/ReportController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, reportController.all);
router.get('/funds/:id', auth, reportController.funds);

export default router;