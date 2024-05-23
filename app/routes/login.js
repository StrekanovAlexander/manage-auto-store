import express from 'express';
import { logIn } from '../controllers/AuthController.js';

const router = express.Router();

router.get('/', (req, res) => res.render('login', { title: 'Login page' }));
router.post('/', logIn);

export default router;