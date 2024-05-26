import express from 'express';
import { getAll, create, store } from '../controllers/UserController.js';
const router = express.Router();

router.get('/', getAll);

router.get('/create', create);

router.post('/create', store);

export default router;