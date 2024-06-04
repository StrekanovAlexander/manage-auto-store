import Lot from '../models/Lot.js';
import LotStatus from '../models/LotStatus.js';
import Brand from '../models/Brand.js';
import Model from '../models/Model.js';
import VehicleStyle from '../models/VehicleStyle.js';
import Specification from '../models/Specification.js';
import SpecificationItem from '../models/SpecificationItem.js';
import User from '../models/User.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const offset = 100;

const all = async (req, res) => {
    Lot.belongsTo(Model, { foreignKey: 'model_id' });
    Lot.belongsTo(VehicleStyle, { foreignKey: 'vehicle_style_id'});
    Lot.belongsTo(LotStatus, { foreignKey: 'lot_status_id'});
    Lot.belongsTo(User, { foreignKey: 'user_id'});

    const lots = await Lot.findAll({ order: [['id', 'DESC']], include: [ Model, VehicleStyle, LotStatus, User ] });
    
    res.render('lots', { 
        title: 'Lots',
        lots,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/lots', 'Lots')
        ])
     });
}

const create = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/lots');
    }
    const lotStatuses = await LotStatus.findAll({ order: [['id', 'DESC']] });
    const brands = await Brand.findAll({ order: [['title']], where: { activity: true } });
    const models = await Model.findAll({ order: [['title']], where: { activity: true } });
    const vehicleStyles = await VehicleStyle.findAll({ order: [['title']] });
    const specificationList = await Specification.findAll({ order: [['title']], where: { activity: true } });
    const specificationItemLists = await SpecificationItem.findAll({ order: [['title']], where: { activity: true } });
    const specifications = specificationList.reduce((acc, el) => {
        const items = specificationItemLists.filter(item => item.specification_id === el.id);
        if (items.length) {
            const specification = { id: el.id, title: el.title, items};  
            acc.push(specification);  
        }
        return acc;
    }, []); 
    const maxId = await Lot.max('id');
    const stockId = maxId ? maxId + offset : offset; 
    
    res.render('lots/create', { 
        title: 'Lot creating',
        stockId: stockId,
        lotStatuses,
        brands,
        models,
        vehicleStyles,
        specifications,
        script: scriptPath('lot/lot.js'),
        validator: scriptPath('lot/lot-validator.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/Lots', 'Lots'),
            breadcrumb.make('#', 'Create....'),
        ])
    });
}

const store = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/lots');
    }
    const entries = Object.entries(req.body);
    const _specifications = entries
        .filter(el => el[0].includes('specification_') && el[1].length > 0)
        .reduce((acc, el) => {
            const specification_id = el[0].split('_')[1];
            const specification_item_id = el[1];
            acc.push({ specification_id, specification_item_id });
            return acc;
        }, []);
    const specifications = JSON.stringify(_specifications);

    const { stock_id, vehicle_style_id, model_id, lot_status_id, vin, year, description } = req.body;
    await Lot.create({ stock_id, vehicle_style_id, model_id, lot_status_id, 
        vin, year, description, specifications, user_id: req.session.user_id });

    setMessage(req, `Lot was created`, 'success');
    res.redirect('/Lots');
}

const edit = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/Lots');
    }
    const { id } = req.params;
    
    Lot.belongsTo(Model, { foreignKey: 'model_id' });
    const lot = await Lot.findOne({ where: {id}, include: [ Model ]});
    const lotStatuses = await LotStatus.findAll({ order: [['id', 'DESC']] });
    const brands = await Brand.findAll({ order: [['title']], where: { activity: true } });
    const models = await Model.findAll({ order: [['title']], where: { activity: true } });
    const vehicleStyles = await VehicleStyle.findAll({ order: [['title']] });
    const specificationList = await Specification.findAll({ order: [['title']], where: { activity: true } });
    const specificationItemLists = await SpecificationItem.findAll({ order: [['title']], where: { activity: true } });
    const _specifications = JSON.parse(lot.specifications);

    const specifications = specificationList.reduce((acc, el) => {
        const items = specificationItemLists.filter(item => item.specification_id === el.id);
        if (items.length) {
            const _selected = _specifications.filter(s => Number(s.specification_id) === el.id);
            const selected = _selected.length ? Number(_selected[0].specification_item_id) : false; 
            const specification = { id: el.id, title: el.title, items, selected };  
            acc.push(specification);  
        }
        return acc;
    }, []); 

    res.render('lots/edit', {
        title: `Lot editing`,
        lot: lot.dataValues,
        brands,
        models,
        vehicleStyles,
        lotStatuses,
        specifications,
        script: scriptPath('lot/lot.js'),
        validator: scriptPath('lot/lot-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/lots', 'Lots'),
            breadcrumb.make('#', lot.id),
            breadcrumb.make('#', 'Edit...'),
        ])
    });
}

const update = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/Lots');
    }
    
    const entries = Object.entries(req.body);
    const _specifications = entries
        .filter(el => el[0].includes('specification_') && el[1].length > 0)
        .reduce((acc, el) => {
            const specification_id = el[0].split('_')[1];
            const specification_item_id = el[1];
            acc.push({ specification_id, specification_item_id });
            return acc;
        }, []);
    const specifications = JSON.stringify(_specifications);

    const { id, vehicle_style_id, model_id, lot_status_id, vin, year, description } = req.body;
    const lot = { vehicle_style_id, model_id, lot_status_id, vin, year, description, specifications, user_id: req.session.user_id };
    
    await Lot.update(lot, { where: { id } });
    
    setMessage(req, `Lot was edited`, 'success');
    res.redirect('/Lots');
}

export default { all, create, store, edit, update };