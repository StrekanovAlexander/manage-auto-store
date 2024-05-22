import express from 'express';
import { brand, home } from './app/routes/index.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', home);
app.use('/brand', brand);

app.listen(3000, () => console.log('Server is running...'));