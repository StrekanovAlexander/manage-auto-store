import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Index Brand page');
});

router.post('/', (req, res) => {
    res.json(req.body);
});

export default router;