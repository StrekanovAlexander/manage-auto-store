import Brand from '../models/Brand.js';
import Model from '../models/Model.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    const { id }= req.params;
    if (!id) {
        res.send('404. Page not found');
    }
    const brand = await Brand.findByPk(id);
    const models = await Model.findAll({ 
        where: { brand_id: id},
        order: [['title'], ['cylinders']] 
    });
    res.render('models', { 
        title: `Модели марки ${ brand.title }`,
        brand: brand.dataValues,
        models,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/dictionaries', 'Справочники'),
            breadcrumb.make('/brands', 'Автомобильные марки'),
            breadcrumb.make('/#', brand.title)
        ])
    });
}

const create = async (req, res) => {
    const { id } = req.params;
    Model.belongsTo(Brand, { foreignKey: 'brand_id' });
    const model = await Model.findOne({ where: { brand_id: id }, include: Brand });
    if (!model) {
        return res.redirect('/404');    
    }
    access.attempt(req, res, access.high, `/brands/${ model.brand_id }/models`);
    
    res.render('models/create', { 
        title: `Создание модели марки ${ model.Brand.title }`,
        model: model.dataValues,
        validator: scriptPath('validators/model/model-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/dictionaries', 'Справочники'),
            breadcrumb.make('/brands', 'Автомобильные марки'),
            breadcrumb.make(`/brands/${ model.Brand.id }/models`, model.Brand.title),
            breadcrumb.make('#', 'Создать....'),
        ])
    });
}

const store = async (req, res) => {
    const { brand_id, title, cylinders, horsepower, miles_per_gallon } = req.body;
    access.attempt(req, res, access.high, `/brands/${ brand_id }/models`);
    
    const brand = await Brand.findByPk(brand_id);
    const _title = `${ brand.title } ${ title }`;
    const model = { brand_id, title: _title };

    if (cylinders) {
        model.cylinders = cylinders;
    }

    if (horsepower) {
        model.horsepower = horsepower;
    }

    if (miles_per_gallon) {
        model.miles_per_gallon = miles_per_gallon;
    }

    await Model.create(model);
    const max = await Model.max('id', { where: { brand_id }});

    setMessage(req, `Модель ${title} была создана`, 'success');
    res.redirect(`/brands/${ brand_id }/models/${ max }/details`);
}

const details = async (req, res) => {
    const { id } = req.params;
    Model.belongsTo(Brand, { foreignKey: 'brand_id' });
    const model = await Model.findOne({ where: { id }, include: Brand });
    if (!model) {
        return res.redirect('/404');
    }
    
    res.render('models/details', { 
        title: `Модель ${ model.title }`,
        model: model.dataValues,
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/dictionaries', 'Справочники'),
            breadcrumb.make('/brands', 'Автомобильные марки'),
            breadcrumb.make(`/brands/${ model.Brand.id }/models`, model.Brand.title),
            breadcrumb.make('#', model.title),
        ])
    });
}

export default { all, create, store, details };
