import express from 'express';
import operationController from '../controllers/OperationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, operationController.all);
router.get('/create', auth, operationController.create);
router.post('/create', auth, operationController.store);

router.get('/:id/edit', auth, operationController.edit);
router.post('/edit', auth, operationController.update);

export default router;