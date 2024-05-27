import express from 'express';
import userController from '../controllers/UserController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', userController.all);
router.get('/create', userController.create);
router.post('/create', userController.store);

router.get('/roles', userController.roles);

export default router;