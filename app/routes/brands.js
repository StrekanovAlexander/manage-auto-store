import express from 'express';
import brandController from '../controllers/BrandController.js';
import modelController from '../controllers/ModelController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, brandController.all);
router.get('/create', auth, brandController.create);
router.post('/create', auth, brandController.store);
router.get('/edit/:id', auth, brandController.edit);
router.post('/edit', auth, brandController.update);

router.get('/:id/models', modelController.all);
router.get('/:id/models/create', modelController.create);
router.post('/models/create', modelController.store);
router.get('/:brand_id/models/:id/details', modelController.details);

router.post('/', (req, res) => {
    res.json(req.body);
});

export default router;