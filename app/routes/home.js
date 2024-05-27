import express from 'express';
import { logIn, logOut } from '../controllers/HomeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, (req, res) => 
    res.render('home', { 
        title: 'Главная',
    })
);

router.get('/login', (req, res) => 
    res.render('home/login', { title: 'Вход', layout: false }));

router.post('/login', logIn);
router.get('/logout', logOut);

export default router;