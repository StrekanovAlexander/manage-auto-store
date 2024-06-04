import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const LotSpecificationItem = sequelize.define('LotSpecificationItem', {
    lot_id: DataTypes.INTEGER,
    specification_item_id: DataTypes.INTEGER,
    activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'lot_specification_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default LotSpecificationItem;