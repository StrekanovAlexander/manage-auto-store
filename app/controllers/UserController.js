import Role from '../models/Role.js';
import User from '../models/User.js';
import grades from '../common/grades.js';
import scriptPath from '../common/script-path.js';

const all = async (req, res) => {
    User.belongsTo(Role, { foreignKey: 'role_id' });
    const users = await User.findAll({ 
        include: Role 
    });
    res.render('users', { 
        title: 'Пользователи',
        users: users,
        grade: grades.isHigh(req.session.grade)
     });
}

const create = async (req, res) => {
    const roles = await Role.findAll({ order: [
        ['id', 'DESC'],
    ] });
    res.render('users/create', { 
        title: 'Создание пользователя',
        roles: roles,
        script: scriptPath('users/user-edit-form.js')
    });
}

const store = (req, res) => {
    res.send('Storing data...')
}

const roles = async (req, res) => {
    const roles = await Role.findAll({ order: [
        ['id', 'DESC'],
    ] });
    res.json({ roles });
}

export default { all, create, roles, store };