import express from 'express';
import lotController from '../controllers/LotController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', lotController.all);
router.get('/create', lotController.create);
router.post('/create', lotController.store);
router.get('/:id/edit', lotController.edit);
router.post('/edit', lotController.update);

export default router;