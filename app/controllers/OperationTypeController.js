import OperationType from '../models/OperationType.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    const operationTypes = await OperationType.findAll({ order: [['title']] });
    res.render('operation-types', { 
        title: 'Виды операций',
        operationTypes,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operation-types', 'Виды операций')
        ])
    });
}

const create = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operation-types');
    }

    res.render('operation-types/create', { 
        title: 'Создание вида операций',
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operation-types', 'Виды операций'),
            breadcrumb.make('#', 'Создание....'),
        ])
    });
}

const store = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operation-types');
    }

    await OperationType.create(req.body);
    setMessage(req, `Вид операции был создан`, 'success');
    res.redirect('/operation-types');
}

const edit = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operation-types');
    }
    const { id } = req.params;
    const operationType = await OperationType.findByPk(id);
    
    res.render('operation-types/edit', {
        title: `Редактирование вида операций "${ operationType.title }"`,
        operationType: operationType.dataValues,
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operation-types', 'Виды операций'),
            breadcrumb.make('#', operationType.title),
            breadcrumb.make('#', 'Редактирование...'),
        ])
    });
}

const update = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operation-types');
    }
    const { id, title, direction, activity } = req.body;

    await OperationType.update({ title, direction, activity: activity === 'on' ? true : false }, { where: { id } });
    setMessage(req, `Вид операции был отредактирован`, 'success');
    res.redirect('/operation-types');
}

export default { all, create, store, edit, update };