import Operation from '../models/Operation.js';
import OperationType from '../models/OperationType.js';
import Participant from '../models/Participant.js';
import PaymentType from '../models/PaymentType.js';

import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    Operation.belongsTo(Participant, { foreignKey: 'participant_id' });
    Operation.belongsTo(OperationType, { foreignKey: 'operation_type_id' });
    Operation.belongsTo(PaymentType, { foreignKey: 'payment_type_id' });
    
    const operations = await Operation.findAll({ 
        include: [ Participant, OperationType, PaymentType ]
    });

    res.render('operations', { 
        title: 'Движение денежных средств',
        operations,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operations', 'Движение средств')
        ])
     });
}

const create = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operations');
    }
    const participants = await Participant.findAll({ order: [['full_name']], where: {activity: true}});
    const operationTypes = await OperationType.findAll({ order: [['title']], where: {activity: true}});
    const paymentTypes = await PaymentType.findAll({ order: [['title']], where: {activity: true}});
    res.render('operations/create', { 
        title: 'Создание записи движения денежных средств',
        participants,
        operationTypes,
        paymentTypes,
        validator: scriptPath('validators/operation/operation-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operations', 'Движение средств'),
            breadcrumb.make('#', 'Создание....'),
        ])
    });
}

const store = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operations');
    }
    const { operation_type_id } = req.body;
    const operationType = await OperationType.findByPk(operation_type_id);
    const direction = operationType.direction;
    const operation = { ...req.body, direction };
    
    await Operation.create(operation);
    setMessage(req, `Операция движения средств была создана`, 'success');
    res.redirect('/operations');
}

const edit = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/brands');
    }
    const { id } = req.params;
    
    const operation = await Operation.findByPk(id);
    
    const participants = await Participant.findAll({ order: [['full_name']], where: {activity: true}});
    const operationTypes = await OperationType.findAll({ order: [['title']], where: {activity: true}});
    const paymentTypes = await PaymentType.findAll({ order: [['title']], where: {activity: true}});

    res.render('operations/edit', { 
        title: `Редактирование записи движения денежных средств #${ id }`,
        operation: operation.dataValues,
        participants,
        operationTypes,
        paymentTypes,
        validator: scriptPath('validators/operation/operation-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operations', 'Движение средств'),
            breadcrumb.make('#', id),
            breadcrumb.make('#', 'Редактирование....'),
        ])
    });
}

const update = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operations');
    }

    const { id, operation_type_id } = req.body;
    
    const operationType = await OperationType.findByPk(operation_type_id);
    const direction = operationType.direction;
    const operation = { ...req.body, direction };

    await Operation.update(operation, { where: { id } });
    
    setMessage(req, `Операция движения средств #${ id } была отредактирована`, 'success');
    res.redirect('/operations');
}

export default { all, create, store, edit, update };