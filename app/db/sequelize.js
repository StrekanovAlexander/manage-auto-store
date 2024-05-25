import { Sequelize } from 'sequelize';

export default new Sequelize('auto_store_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
}); 