import express from 'express';
import userController from '../controllers/UserController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', userController.all);
router.get('/create', userController.create);
router.post('/create', userController.store);

router.get('/edit/:id', userController.edit);
router.post('/edit', userController.update);

router.get('/pwd/:id', userController.pwd);
router.post('/pwd', userController.storePwd);


export default router;