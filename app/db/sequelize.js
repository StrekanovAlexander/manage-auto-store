import { Sequelize } from 'sequelize';

const host='localhost', dbname = 'auto_store_db', username = 'root', password = 'root';
//const host='sql7.freemysqlhosting.net', dbname = 'sql7710378', username = 'sql7710378', password = 'kEUbYwx6gU';

export default new Sequelize(dbname, username, password, {
    host: host,
    dialect: 'mysql',
    logging: false
}); 