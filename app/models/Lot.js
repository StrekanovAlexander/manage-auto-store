import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Lot = sequelize.define('Lot', {
    stock_id: DataTypes.INTEGER,
    vehicle_style_id: DataTypes.INTEGER,
    model_id: DataTypes.INTEGER,
    lot_status_id: DataTypes.INTEGER,
    vin: DataTypes.STRING,
    year: DataTypes.STRING,
    description: DataTypes.STRING,
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