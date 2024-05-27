import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import User from './User.js';

const Role = sequelize.define('Role', {
    title: DataTypes.STRING,
    grade: DataTypes.STRING,
}, {
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Role.hasMany(User, {
    foreignKey: 'role_id'
});

export default Role;
