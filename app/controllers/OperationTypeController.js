import OperationType from '../models/OperationType.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    const operationTypes = await OperationType.findAll({ order: [['title']] });
    res.render('operation-types', { 
        title: 'Operation types',
        operationTypes,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operation-types', 'Operation types')
        ])
    });
}

const create = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operation-types');
    }

    res.render('operation-types/create', { 
        title: 'Operation type creating',
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operation-types', 'Operation types'),
            breadcrumb.make('#', 'Create....'),
        ])
    });
}

const store = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operation-types');
    }

    const { title, direction, is_lot: _is_lot } = req.body;
    const is_lot = _is_lot === 'on' ? true : false;

    await OperationType.create({ title, direction, is_lot });
    setMessage(req, `Operation type was created`, 'success');
    res.redirect('/operation-types');
}

const edit = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operation-types');
    }
    const { id } = req.params;
    const operationType = await OperationType.findByPk(id);
    
    res.render('operation-types/edit', {
        title: `Operation type "${ operationType.title }" edititng`,
        operationType: operationType.dataValues,
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operation-types', 'Operation types'),
            breadcrumb.make('#', operationType.title),
            breadcrumb.make('#', 'Edit...'),
        ])
    });
}

const update = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operation-types');
    }
    const { id, title, is_lot, direction, activity } = req.body;
    const _is_lot = is_lot === 'on' ? true : false;
    const _activity = activity === 'on' ? true : false

    await OperationType.update({ title, direction, is_lot: _is_lot,  activity: _activity }, { where: { id } });
    setMessage(req, `Operation type was edited`, 'success');
    res.redirect('/operation-types');
}

export default { all, create, store, edit, update };