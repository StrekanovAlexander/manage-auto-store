import { Op } from 'sequelize';
import Origin from '../models/Origin.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    const origins = await Origin.findAll({ order: [['title', 'ASC']] });
    res.render('origins', { 
        title: 'Страны',
        origins: origins,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/#', 'Справочники'),
            breadcrumb.make('/origins', 'Страны')
        ])
     });
}

const create = async (req, res) => {
    access.attempt(req, res, access.high, '/origins');
    res.render('origins/create', { 
        title: 'Создание cтраны',
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/#', 'Справочники'),
            breadcrumb.make('/origins', 'Страны'),
            breadcrumb.make('#', 'Создать....'),
        ])
    });
}

const store = async (req, res) => {
    access.attempt(req, res, access.high, '/origins');
    const { title } = req.body;
    const origin = await Origin.findOne({ where: { title: title.trim() } });
    if (origin) {
        setMessage(req, `Страна ${title} уже существует`, 'danger');
        return res.redirect('/origins/create');
    }
    
    await Origin.create({ title });
    setMessage(req, `Страна ${title} была создана`, 'success');
    res.redirect('/origins');
}

const edit = async (req, res) => {
    access.attempt(req, res, access.high, '/origins');
    const { id } = req.params;
    const origin = await Origin.findOne({ attributes: ['id', 'title'], where: { id } });

    res.render('origins/edit', {
        title: 'Редактирование страны',
        origin: origin.dataValues,
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/#', 'Справочники'),
            breadcrumb.make('/origins', 'Страны'),
            breadcrumb.make('#', origin.title),
            breadcrumb.make('#', 'Редактировать...'),
        ])
    });
}

const update = async (req, res) => {
    access.attempt(req, res, access.high, '/origins');
    const { id, title } = req.body;
    let origin = await Origin.findOne({ attributes: ['id', 'title'], 
        where: { id: { [Op.ne]: id }, title: title }
    });
    if (origin) {
        setMessage(req, `Страна ${ title } уже используется`, 'danger');
        return res.redirect('/origins/edit/' + id);    
    }
    await Origin.update({ title }, { where: { id } });
    setMessage(req, `Страна ${ title } была отредактирована`, 'success');

    res.redirect('/origins');
}

export default { all, create, store, edit, update };