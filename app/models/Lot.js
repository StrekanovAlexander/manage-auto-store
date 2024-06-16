import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Lot = sequelize.define('Lot', {
    account_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    lot_status_id: DataTypes.INTEGER,
    model_id: DataTypes.INTEGER,
    vehicle_style_id: DataTypes.INTEGER,
    date_buy: DataTypes.DATEONLY,
    date_ready: DataTypes.DATEONLY,
    date_sale: DataTypes.DATEONLY,
    vin: DataTypes.STRING,
    year: DataTypes.STRING,
    specifications: DataTypes.TEXT,
    description: DataTypes.TEXT,
    activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'lots',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Lot;