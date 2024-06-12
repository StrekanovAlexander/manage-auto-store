import { Op } from 'sequelize';
import paginate from 'express-paginate';
import Operation from '../models/Operation.js';
import OperationType from '../models/OperationType.js';
import Customer from '../models/Customer.js';
import Participant from '../models/Participant.js';
import PaymentType from '../models/PaymentType.js';
import User from '../models/User.js';
import Lot from '../models/Lot.js';

import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

Operation.belongsTo(Customer, { foreignKey: 'customer_id' });
Operation.belongsTo(Participant, { foreignKey: 'participant_id' });
Operation.belongsTo(OperationType, { foreignKey: 'operation_type_id' });
Operation.belongsTo(PaymentType, { foreignKey: 'payment_type_id' });
Operation.belongsTo(User, { foreignKey: 'user_id' });
Operation.belongsTo(Lot, { foreignKey: 'lot_id' });

const all = async (req, res) => {
    
    const results = await Operation.findAndCountAll({
        where: { lot_id: { [Op.is]: null } },
        order: [['date_reg', 'DESC'], ['created_at', 'DESC']],
        limit: req.query.limit, 
        offset: req.skip,
        include: [ Participant, OperationType, PaymentType, User, Lot, Customer ]
    });

    const pageCount = Math.ceil(results.count / req.query.limit);
    const pages = paginate.getArrayPages(req)(req.query.limit, pageCount, req.query.page);

    const customers = await Customer.findAll({ order: [['is_main', 'DESC']], where: {activity: true}});
    const participants = await Participant.findAll({ order: [['full_name']], where: {activity: true}});
    const operationTypes = await OperationType.findAll({ order: [['title']], where: {activity: true, is_car_cost: false}});
    const paymentTypes = await PaymentType.findAll({ order: [['title']], where: {activity: true}});
    
    res.render('operations', { 
        title: 'Operations',
        customers,
        participants,
        operationTypes,
        paymentTypes,
        validator: scriptPath('validators/operation/operation-edit.js'),
        script: scriptPath('operation/operation-edit.js'),
        operations: results.rows,
        pages,
        hasPrevPage: req.query.page > 1,
        hasNextPage: req.query.page < pageCount,
        prevPage: paginate.href(req)(true),
        nextPage: paginate.href(req)(),
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/operations', 'Operations')
        ])
    });
}

const store = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operations');
    }
   
    const { date_reg, customer_id, participant_id, operation_type_id, payment_type_id, amount, description } = req.body;
    const operationType = await OperationType.findByPk(operation_type_id);
    const direction = operationType.direction;
    const user_id = req.session.user_id;
    const operation = { date_reg, customer_id, participant_id, operation_type_id, payment_type_id, amount, description, direction, user_id };
     
    await Operation.create(operation);
    setMessage(req, `Operation was created`, 'success');
    res.redirect('/operations');
}

const update = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operations');
    }

    const { id, operation_type_id } = req.body;
    
    const operationType = await OperationType.findByPk(operation_type_id);
    const direction = operationType.direction;
    const user_id = req.session.user_id;
    const operation = await Operation.findByPk(id);
    
    await Operation.update({ ...req.body, direction, user_id }, { where: { id } });
    
    if (operation.lot_id) {
        setMessage(req, `Cost was edited`, 'success');
        res.redirect(`/lots/${ operation.lot_id }/details`);    
    } else {
        setMessage(req, `Operation was edited`, 'success');
        res.redirect('/operations');
    }    
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

// const remove = async (req, res) => {
//     if (!access.isAllow(req, access.high)) {
//         return res.redirect('/operations');
//     }
// 
//     const { id } = req.params;
//     const operation = await Operation.findOne({ where: { id }, 
//         include: [ Participant, OperationType, PaymentType, User, Lot ] });
// 
//     res.render('operations/remove', { 
//         title: 'Operation removing',
//         operation: operation.dataValues, 
//         breadcrumb: breadcrumb.build([
//             breadcrumb.make('/operations', 'Funds movement'),
//             breadcrumb.make('#', id),
//             breadcrumb.make('#', 'Remove...'),
//         ])
//     });
// }

const remove = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/operations');
    }

    const { id } = req.body;
    await Operation.destroy({ where: { id } });
    setMessage(req, `Operation was deleted`, 'success');
    res.redirect('/operations');
    
}

export default { all, store, update, storeLot, remove };