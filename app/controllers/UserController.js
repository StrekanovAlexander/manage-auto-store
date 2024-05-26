import Permission from '../models/Permission.js';
import User from '../models/User.js';
import grades from '../common/grades.js';
import scriptPath from '../common/script-path.js';

const getAll = async (req, res) => {
    User.belongsTo(Permission, { foreignKey: 'permission_id' });
    const users = await User.findAll({ 
        include: Permission 
    });
    res.render('users', { 
        title: 'Пользователи',
        users: users,
        grade: grades.isHigh(req.session.grade)
     });
}

const create = async (req, res) => {
    const permissions = await Permission.findAll({ order: [
        ['id', 'DESC'],
    ] });
    res.render('users/create', { 
        title: 'Создание пользователя',
        permissions: permissions,
        script: scriptPath('users/user-edit-form.js')
    });
}

const store = (req, res) => {
    res.send('Storing data...')
}

export { getAll, create, store };