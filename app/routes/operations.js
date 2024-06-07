import express from 'express';
import operationController from '../controllers/OperationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, operationController.all);
router.get('/create', auth, operationController.create);
router.post('/create', auth, operationController.store);

router.get('/:id/edit', auth, operationController.edit);
router.post('/edit', auth, operationController.update);

router.post('/lot/create', auth, operationController.storeLot);

router.get('/:id/remove', operationController.remove);
router.post('/remove', operationController.removeOp);

router.get('/:id/details', auth, operationController.details);

export default router;