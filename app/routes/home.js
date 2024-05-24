import express from 'express';
import { logIn } from '../controllers/HomeController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, (req, res) => 
    res.render('home', { title: 'Home page' })
);

router.get('/login', (req, res) => 
    res.render('home/login', { title: 'Manage Auto Store', layout: false }));

router.post('/login', logIn);

export default router;