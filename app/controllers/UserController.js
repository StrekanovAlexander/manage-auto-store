import Permission from '../models/Permission.js';
import User from '../models/User.js';
import grades from '../common/grades.js';

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

export { getAll };