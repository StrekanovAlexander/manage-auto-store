import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Brand from './Brand.js';

const Origin = sequelize.define('Origin', {
    title: DataTypes.STRING,
    activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'origins',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Origin.hasMany(Brand, {
    foreignKey: 'origin_id'
});

export default Origin;