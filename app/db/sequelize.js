import { Sequelize } from 'sequelize';

const host='localhost', dbname = 'auto_store_db', username = 'root', password = 'root';

export default new Sequelize(dbname, username, password, {
    host: host,
    dialect: 'mysql',
    logging: false
}); 