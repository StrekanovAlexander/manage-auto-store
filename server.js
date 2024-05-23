import 'dotenv/config';
import express from 'express';
import hbs from 'express-handlebars';
import auth from './app/middleware/auth.js';
import { home, brands, login, users } from './app/routes/index.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.engine('.hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './app/views');

app.use('/', home);
app.use('/login', login);
app.use('/brands', brands);
app.use('/users', users);

app.listen(
    process.env.PORT || 3000, 
    () => console.log('Server is running...')
);