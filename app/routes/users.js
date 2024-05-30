import express from 'express';
import userController from '../controllers/UserController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', userController.all);
router.get('/create', auth, userController.create);
router.post('/create', auth, userController.store);

router.get('/edit/:id', auth, userController.edit);
router.post('/edit', auth, userController.update);

router.get('/pwd/:id', auth, userController.pwd);
router.post('/pwd', auth, userController.storePwd);


export default router;