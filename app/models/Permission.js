import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import User from './User.js';

const Permission = sequelize.define('Permission', {
    title: DataTypes.STRING,
    grade: DataTypes.STRING,
}, {
    tableName: 'permissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Permission.hasMany(User, {
    foreignKey: 'permission_id'
});

export default Permission;
