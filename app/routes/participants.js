import express from 'express';
import participantController from '../controllers/ParticipantController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, participantController.all);
router.get('/create', auth, participantController.create);
router.post('/create', auth, participantController.store);
router.get('/:id/edit', auth, participantController.edit);
router.post('/edit', auth, participantController.update);

export default router;