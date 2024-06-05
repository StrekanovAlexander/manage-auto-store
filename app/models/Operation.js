import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Operation = sequelize.define('Operation', {
    user_id: DataTypes.INTEGER,
    participant_id: DataTypes.INTEGER,
    operation_type_id: DataTypes.INTEGER,
    payment_type_id: DataTypes.INTEGER,
    lot_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(10, 2), 
    description: DataTypes.STRING,
    direction: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['in', 'out']],
        },
    },
    activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'operations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Operation;
