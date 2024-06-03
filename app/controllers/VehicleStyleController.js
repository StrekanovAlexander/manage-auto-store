import { Op } from 'sequelize';
import VehicleStyle from '../models/VehicleStyle.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    const vehicleStyles = await VehicleStyle.findAll({ order: [['title']] });
    res.render('vehicle-styles', { 
        title: 'Vehicle styles',
        vehicleStyles,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/vehicle-styles', 'Vehicle styles')
        ])
     });
}

const create = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/vehicle-styles');
    }
    res.render('vehicle-styles/create', { 
        title: 'Создание cтраны',
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/vehicle-styles', 'Страны'),
            breadcrumb.make('#', 'Создание....'),
        ])
    });
}

const store = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/vehicle-styles');
    }
    const { title } = req.body;
    const vehicleStyle = await VehicleStyle.findOne({ where: { title: title.trim() } });
    if (vehicleStyle) {
        setMessage(req, `Страна ${title} уже существует`, 'danger');
        return res.redirect('/vehicle-styles/create');
    }
    
    await VehicleStyle.create({ title });
    setMessage(req, `Страна ${title} была создана`, 'success');
    res.redirect('/vehicle-styles');
}

const edit = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/vehicle-styles');
    }
    const { id } = req.params;
    const vehicleStyle = await VehicleStyle.findOne({ attributes: ['id', 'title'], where: { id } });

    res.render('vehicle-styles/edit', {
        title: `Редактирование страны "${ VehicleStyle.title }"`,
        VehicleStyle: vehicleStyle.dataValues,
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/vehicle-styles', 'Страны'),
            breadcrumb.make('#', vehicleStyle.title),
            breadcrumb.make('#', 'Редактирование...'),
        ])
    });
}

const update = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/vehicle-styles');
    }
    const { id, title } = req.body;
    let vehicleStyle = await VehicleStyle.findOne({ attributes: ['id', 'title'], 
        where: { id: { [Op.ne]: id }, title: title }
    });
    if (vehicleStyle) {
        setMessage(req, `Страна ${ title } уже используется`, 'danger');
        return res.redirect(`/vehicle-styles/${ id }/edit`);    
    }
    await VehicleStyle.update({ title }, { where: { id } });
    setMessage(req, `Страна ${ title } была отредактирована`, 'success');

    res.redirect('/VehicleStyles');
}

export default { all, create, store, edit, update };