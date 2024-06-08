import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Role = sequelize.define('Role', {
    title: DataTypes.STRING,
    grade: DataTypes.STRING,
}, {
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Role;
