import Origin from '../models/Origin.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    const origins = await Origin.findAll({ order: [['title', 'ASC']] });
    console.log(origins);
    res.render('origins', { 
        title: 'Страны происхождения',
        origins: origins,
        // access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/', 'Главная'),
            breadcrumb.make('/#', 'Справочники'),
            breadcrumb.make('/origins', 'Страны происхождения')
        ])
     });
}

const create = async (req, res) => {
    // access.attempt(req, res, access.high, '/users');
    res.render('origins/create', { 
        title: 'Создание cтраны происхождения',
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/', 'Главная'),
            breadcrumb.make('/#', 'Справочники'),
            breadcrumb.make('/origins', 'Страны происхождения'),
            breadcrumb.make('#', 'Создание....'),
        ])
    });
}

const store = async (req, res) => {
    // access.attempt(req, res, access.high, '/users');
    const { title } = req.body;
    const origin = await Origin.findOne({ where: { title: title.trim() } });
    if (origin) {
        setMessage(req, `Страна происхождения ${title} уже существует`, 'danger');
        return res.redirect('/origins/create');
    }
    res.send('Ok');

    await Origin.create({ title });
    setMessage(req, `Страна происхождения '${username}' была создана`, 'success');
    res.redirect('/origins');
}

export default { all, create, store };