import express from 'express';
import customerController from '../controllers/CustomerController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, customerController.all);
router.get('/create', auth, customerController.create);
router.post('/create', auth, customerController.store);
router.get('/:id/edit', auth, customerController.edit);
router.post('/edit', auth, customerController.update);

export default router;