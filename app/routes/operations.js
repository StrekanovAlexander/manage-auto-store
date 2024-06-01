import express from 'express';
import operationController from '../controllers/OperationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', operationController.all);


export default router;