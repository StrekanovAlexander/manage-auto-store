import express from 'express';
import { login, logout, home } from '../controllers/HomeController.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/', auth, home);

router.get('/login', (req, res) => 
    res.render('home/login', { title: 'Вход', layout: false }));

router.post('/login', login);
router.get('/logout', logout);

export default router;