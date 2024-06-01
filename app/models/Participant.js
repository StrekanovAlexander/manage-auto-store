import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Participant = sequelize.define('Participant', {
    full_name: DataTypes.STRING,
    activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'participants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Participant;