import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const PaymentType = sequelize.define('PaymentType', {
    title: DataTypes.STRING,
    activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'payment_types',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default PaymentType;