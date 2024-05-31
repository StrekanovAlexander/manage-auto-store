import { DataTypes, INTEGER, NUMBER } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Model = sequelize.define('Model', {
    brand_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    miles_per_gallon: {
        type: DataTypes.DECIMAL(5, 1),
        allowNull: true,
    },
    cylinders: DataTypes.INTEGER,
    horsepower: DataTypes.INTEGER,
    activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Model;