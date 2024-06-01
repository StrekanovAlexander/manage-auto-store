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

export default { all };