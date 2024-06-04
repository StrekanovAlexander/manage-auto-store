import express from 'express';
import lotController from '../controllers/LotController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, lotController.all);
router.get('/create', auth, lotController.create);
router.post('/create', auth, lotController.store);
router.get('/:id/edit', lotController.edit);
router.post('/edit', lotController.update);

export default router;