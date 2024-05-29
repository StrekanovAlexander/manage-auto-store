import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import Role from '../models/Role.js';
import User from '../models/User.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    User.belongsTo(Role, { foreignKey: 'role_id' });
    const users = await User.findAll({ order: [['username', 'ASC']], include: Role });
    res.render('users', { 
        title: 'Пользователи',
        users: users,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/', 'Главная'),
            breadcrumb.make('/#', 'Справочники'),
            breadcrumb.make('/users', 'Пользователи'),
        ])
     });
}

const create = async (req, res) => {
    access.attempt(req, res, access.high, '/users');

    const roles = await Role.findAll({ order: [['id', 'DESC']] });
    res.render('users/create', { 
        title: 'Создание пользователя',
        roles: roles,
        validator: scriptPath('validators/user/user-create.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/', 'Главная'),
            breadcrumb.make('/#', 'Справочники'),
            breadcrumb.make('/users', 'Пользователи'),
            breadcrumb.make('#', 'Создание пользователя'),
        ])
    });
}

const store = async (req, res) => {
    access.attempt(req, res, access.high, '/users');
    const { username, password, role_id } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user) {
        setMessage(req, `Пользователь ${username} уже существует`, 'danger');
        return res.redirect('/users/create');
    }
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync());
    await User.create({ role_id, username, password: hash });
    setMessage(req, `Пользователь '${username}' был создан`, 'success');
    res.redirect('/users');
}

const edit = async (req, res) => {
    access.attempt(req, res, access.high, '/users');
    const { id } = req.params;
    const user = await User.findOne({ attributes: ['id', 'role_id', 'username', 'activity'],
        where: { id }
    });

    const roles = await Role.findAll({ order: [['id', 'DESC']] });
    res.render('users/edit', {
        title: 'Редактирование пользователя',
        user: user.dataValues,
        validator: scriptPath('validators/user/user-edit.js'),
        roles: roles,
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/', 'Главная'),
            breadcrumb.make('/#', 'Справочники'),
            breadcrumb.make('/users', 'Пользователи'),
            breadcrumb.make('#', user.username),
        ])
    });
}

const update = async (req, res) => {
    access.attempt(req, res, access.high, '/users');
    const { id, role_id, username, activity } = req.body;
    let user = await User.findOne({ attributes: ['id', 'username'], 
        where: { id: { [Op.ne]: id }, username: username }
    });
    if (user) {
        setMessage(req, `Имя пользователя ${username} уже используется`, 'danger');
        return res.redirect('/users/edit/' + id);    
    }
    user = await User.findOne({ where: { id } });
    if (user.root) {
        await User.update({ role_id, username }, { where: { id } });
    } else {
        await User.update({ role_id, username, activity: activity === 'on' ? true : false }, 
            { where: { id } }
        );
    }
    
    setMessage(req, `Данные пользователя ${ username } были отредактированы`, 'success');
    res.redirect('/users');
}

const pwd = async (req, res) => {
    access.attempt(req, res, access.high, '/users');
    const { id } = req.params;
    const user = await User.findOne({ attributes: ['id', 'username'], where: { id } });
    res.render('users/pwd', {
        title: 'Новый пароль пользователя',
        user: user.dataValues,
        validator: scriptPath('validators/user/user-pwd.js')
    });
}

const storePwd = async (req, res) => {
    access.attempt(req, res, access.high, '/users');
    const { id, password } = req.body;
    const user = await User.findOne({ attributes: ['username'], where: { id } });
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync());
    await User.update({ password: hash }, { where: { id } });
    setMessage(req, `Пароль пользователя ${ user.username } был изменен`, 'success');
    res.redirect('/users');
}

export default { all, create, store, edit, update, pwd, storePwd };