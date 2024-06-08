import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Customer = sequelize.define('Customer', {
    title: DataTypes.STRING,
    is_main: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'customers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Customer;