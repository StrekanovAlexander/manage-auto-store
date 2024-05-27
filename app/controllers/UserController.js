import bcrypt from 'bcrypt';
import Role from '../models/Role.js';
import User from '../models/User.js';
import grades from '../common/grades.js';
import scriptPath from '../common/script-path.js';
import message from '../common/message.js';

const all = async (req, res) => {
    User.belongsTo(Role, { foreignKey: 'role_id' });
    const users = await User.findAll({ 
        include: Role 
    });
    res.render('users', { 
        title: 'Пользователи',
        users: users,
        grade: grades.isHigh(req.session.grade),
        msg: message(req)
     });
}

const create = async (req, res) => {
    const roles = await Role.findAll({ order: [
        ['id', 'DESC'],
    ] });
    res.render('users/create', { 
        title: 'Создание пользователя',
        roles: roles,
        validator: scriptPath('validators/user.js'),
        msg: message(req)
    });
}

const store = async (req, res) => {
    const { username, password, role_id } = req.body;
    const user = await User.findOne({ 
        where: { username }
    });
    if (user) {
        req.session.msgTitle = `Пользователь '${username}' уже существует`;
        req.session.msgType = 'danger';
        return res.redirect('/users/create');
    }
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync());
    await User.create({ role_id, username, password: hash });
    req.session.msgTitle = `Пользователь '${username}' был успешно создан`;
    req.session.msgType = 'success';
    res.redirect('/users');
}

const roles = async (req, res) => {
    const roles = await Role.findAll({ order: [
        ['id', 'DESC'],
    ] });
    res.json({ roles });
}

export default { all, create, roles, store };