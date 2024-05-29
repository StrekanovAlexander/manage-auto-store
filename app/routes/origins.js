import express from 'express';
import originController from '../controllers/OriginController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', originController.all);
router.get('/create', originController.create);
router.post('/create', originController.store);

export default router;