import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('brands', { title: 'Марки автомобилей' });
});

router.post('/', (req, res) => {
    res.json(req.body);
});

export default router;