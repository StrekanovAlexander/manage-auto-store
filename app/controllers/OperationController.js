import Operation from '../models/Operation.js';
import OperationType from '../models/OperationType.js';
import Participant from '../models/Participant.js';
import PaymentType from '../models/PaymentType.js';
import User from '../models/User.js';
import Lot from '../models/Lot.js';

import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    Operation.belongsTo(Participant, { foreignKey: 'participant_id' });
    Operation.belongsTo(OperationType, { foreignKey: 'operation_type_id' });
    Operation.belongsTo(PaymentType, { foreignKey: 'payment_type_id' });
    Operation.belongsTo(User, { foreignKey: 'user_id' });
    Operation.belongsTo(Lot, { foreignKey: 'lot_id' });
    
    const operations = await Operation.findAll({ 
        include: [ Participant, OperationType, PaymentType, User, Lot ]
    });

    res.render('operations', { 
        title: 'Funds movement',
        operations,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operations', 'Funds movement')
        ])
     });
}

const create = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operations');
    }
    const participants = await Participant.findAll({ order: [['full_name']], where: {activity: true}});
    const operationTypes = await OperationType.findAll({ order: [['title']], where: {activity: true, is_lot: false}});
    const paymentTypes = await PaymentType.findAll({ order: [['title']], where: {activity: true}});
    res.render('operations/create', { 
        title: 'Funds movement creating',
        participants,
        operationTypes,
        paymentTypes,
        validator: scriptPath('validators/operation/operation-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operations', 'Funds movement'),
            breadcrumb.make('#', 'Create....'),
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
    const user_id = req.session.user_id;
    const operation = { ...req.body, direction, user_id };
    
    await Operation.create(operation);
    setMessage(req, `Funds movement was created`, 'success');
    res.redirect('/operations');
}

const edit = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/brands');
    }
    const { id } = req.params;
    
    const operation = await Operation.findByPk(id);
    
    const participants = await Participant.findAll({ order: [['full_name']], where: {activity: true}});
    const operationTypes = await OperationType.findAll({ order: [['title']], where: {activity: true, is_lot: false}});
    const paymentTypes = await PaymentType.findAll({ order: [['title']], where: {activity: true}});

    res.render('operations/edit', { 
        title: `Funds movement edit`,
        operation: operation.dataValues,
        participants,
        operationTypes,
        paymentTypes,
        validator: scriptPath('validators/operation/operation-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operations', 'Funds movement'),
            breadcrumb.make('#', id),
            breadcrumb.make('#', 'Edit....'),
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
    const user_id = req.session.user_id;
    const operation = { ...req.body, direction, user_id };

    await Operation.update(operation, { where: { id } });
    
    setMessage(req, `Funds movement record was edited`, 'success');
    res.redirect('/operations');
}

const storeLot = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operations');
    }
    const { operation_type_id, lot_id } = req.body;
    const operationType = await OperationType.findByPk(operation_type_id);
    const direction = operationType.direction;
    const user_id = req.session.user_id;
    const operation = { ...req.body, direction, user_id, lot_id };
    
    await Operation.create(operation);
    setMessage(req, `Operation by lot was created`, 'success');
    res.redirect(`/lots/${lot_id}/details`);
}

export default { all, create, store, edit, update, storeLot };