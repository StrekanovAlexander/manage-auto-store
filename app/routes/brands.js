import express from 'express';
import brandController from '../controllers/BrandController.js';
const router = express.Router();

router.get('/', brandController.all);
router.get('/create', brandController.create);
router.post('/create', brandController.store);
router.get('/edit/:id', brandController.edit);
router.post('/edit', brandController.update);

router.post('/', (req, res) => {
    res.json(req.body);
});

export default router;