import { Op } from 'sequelize';
import Brand from '../models/Brand.js';
import Origin from '../models/Origin.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    Brand.belongsTo(Origin, { foreignKey: 'origin_id' });
    const brands = await Brand.findAll({ order: [['title']], include: Origin });
    res.render('brands', { 
        title: 'Автомобильные марки',
        brands,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/dictionaries', 'Справочники'),
            breadcrumb.make('/brands', 'Автомобильные марки')
        ])
    });
}

const create = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/brands');
    }
    const origins = await Origin.findAll({ order: [['title']]});
    res.render('brands/create', { 
        title: 'Создание автомобильной марки',
        origins: origins,
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/dictionaries', 'Справочники'),
            breadcrumb.make('/brands', 'Автомобильные марки'),
            breadcrumb.make('#', 'Создание....'),
        ])
    });
}

const store = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/brands');
    }
    
    const { title, origin_id } = req.body;
    const brand = await Brand.findOne({ where: { title: title.trim() } });
    
    if (brand) {
        setMessage(req, `Автомобильная марка ${title} уже существует`, 'danger');
        return res.redirect('/brands/create');
    }
    
    const _brand = !origin_id ? {title, origin_id: null} : { title, origin_id };
    await Brand.create(_brand);
    
    setMessage(req, `Автомобильная марка ${title} была создана`, 'success');
    res.redirect('/brands');
}

const edit = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/brands');
    }
    const { id } = req.params;
    const brand = await Brand.findOne({ attributes: ['id', 'origin_id', 'title', 'activity'], where: { id } });
    const origins = await Origin.findAll({ order: [['title']]});

    res.render('brands/edit', {
        title: 'Редактирование автомобильной марки',
        brand: brand.dataValues,
        origins,
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/dictionaries', 'Справочники'),
            breadcrumb.make('/brands', 'Автомобильные марки'),
            breadcrumb.make('#', brand.title),
            breadcrumb.make('#', 'Редактирование...'),
        ])
    });
}

const update = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/brands');
    }
    const { id, origin_id, title, activity } = req.body;
    let brand = await Brand.findOne({ attributes: ['id', 'title', 'origin_id'], 
        where: { id: { [Op.ne]: id }, title: title }
    });
    if (brand) {
        setMessage(req, `Автомобильная марка ${ title } уже используется`, 'danger');
        return res.redirect(`/brands/${ id }/edit`);    
    }

    const _activity = activity === 'on' ? true : false;
    const _brand = !origin_id ? {origin_id: null, title, activity: _activity} : 
        { origin_id, title, activity: _activity };

    await Brand.update(_brand, { where: { id } });
    setMessage(req, `Автомобильная марка ${ title } была отредактирована`, 'success');

    res.redirect('/brands');
}

export default { all, create, store, edit, update };