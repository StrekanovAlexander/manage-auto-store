import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Index page');
});

router.get('/signin', (req, res) => {
    res.send('SignIn page');
});

router.post('/signin', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

export default router;