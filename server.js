import 'dotenv/config';
import express from 'express';
import hbs from 'express-handlebars';
import paginate from 'express-paginate';
import session from 'express-session';
import helpers from './app/common/helpers.js';
import { routes } from './app/routes/index.js';
import sequelize from './app/db/sequelize.js';

const rowsLimit = 15;
const rowsMaxLimit = rowsLimit;

const app = express();

app.use(paginate.middleware(rowsLimit, rowsMaxLimit));

app.use(session({ secret: process.env.JWT_KEY, resave: false, saveUninitialized: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.engine('.hbs', hbs.engine({ extname: '.hbs', helpers }));
app.set('view engine', '.hbs');
app.set('views', './app/views');

try {
    await sequelize.authenticate();

    app.use('/', routes.home);
    app.use('/brands', routes.brands);
    app.use('/customers', routes.customers);
    app.use('/lots', routes.lots);
    app.use('/operations', routes.operations);
    app.use('/operation-types', routes.operationTypes);
    app.use('/participants', routes.participants);
    app.use('/specifications', routes.specifications);
    app.use('/reports', routes.reports);
    app.use('/vehicle-styles', routes.vehicleStyles);
    app.use('/users', routes.users);

    app.all('*', (req, res) => { 
        res.status(404).send('404! Page not found'); 
    }); 

    app.listen(
        process.env.PORT || 3000, 
        () => console.log('Server is running...')
    );
} catch (e) {
    console.error('Can`t connect to database', e);
}