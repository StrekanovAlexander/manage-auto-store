import express from 'express';
import { getAll } from '../controllers/UserController.js';
const router = express.Router();

router.get('/', getAll);

router.post('/', (req, res) => {
    res.json(req.body);
});

export default router;