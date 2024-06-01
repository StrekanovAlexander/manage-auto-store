import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
// import Model from './Model.js';

const Brand = sequelize.define('Brand', {
    origin_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'brands',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Brand.hasMany(Model, {
//     foreignKey: 'brand_id'
// });

export default Brand;