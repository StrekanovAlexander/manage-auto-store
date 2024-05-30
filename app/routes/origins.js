import express from 'express';
import originController from '../controllers/OriginController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, originController.all);
router.get('/create', auth, originController.create);
router.post('/create', auth, originController.store);
router.get('/edit/:id', auth, originController.edit);
router.post('/edit', auth, originController.update);

export default router;