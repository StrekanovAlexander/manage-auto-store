import { Sequelize } from 'sequelize';
import Customer from '../models/Customer.js';
import Participant from '../models/Participant.js';
import Operation from '../models/Operation.js';
import OperationType from '../models/OperationType.js';

Operation.belongsTo(Participant, { foreignKey: 'participant_id' });
Operation.belongsTo(Customer, { foreignKey: 'customer_id' });
Operation.belongsTo(OperationType, { foreignKey: 'operation_type_id' });

const participantsTotal = async (customerId, operationTypeId) => {
    const participants = await Operation.findAll({ 
        attributes: [ 'participant_id', [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'] ], 
        group: ['participant_id'], where: { customer_id: customerId, operation_type_id: operationTypeId },
        include: [ Participant ]
    });

    return participants
        .sort((a, b) => a.Participant.full_name > b.Participant.full_name ? 1 : -1)
        .reduce((acc, el) => {
            acc.push({ id: el.participant_id,  full_name: el.Participant.full_name, totalAmount: el.dataValues.totalAmount});
            return acc;
        }, []);
}

const operationsDetails = async (customerId, operationTypeId, participants) => {
    const operations = await Operation.findAll({ order: [['date_reg', 'DESC'], ['created_at', 'DESC']], 
        where: { customer_id: customerId, operation_type_id: operationTypeId }, include: [ OperationType ] });

    return operations.reduce((acc, el) => {
        const { id, participant_id, date_reg, amount, description} = el.dataValues;
        const row = { id, date_reg, operationType: el.dataValues.OperationType.dataValues.title, description, participants: [] };
        participants.forEach(el => {
            const _amount = participant_id === el.id ? amount : 0;
            row.participants.push({ full_name: el.full_name, amount: _amount })
        });
        acc.push(row);
        return acc;
    }, []);
}

const funds = async (req, res) => {
    const customer1 = await Customer.findByPk(1);
    const participants1 = await participantsTotal(1, 1);
    const customerTotal1 = participants1.reduce((acc, el) => acc += Number(el.totalAmount), 0);
    const operations1 = await operationsDetails(1, 1, participants1);

    res.render('reports/funds', { 
        title: 'Funds',
        participants1,
        customer1: customer1.dataValues,
        customerTotal1,
        operations1,
    });
}

export default {
    funds
}