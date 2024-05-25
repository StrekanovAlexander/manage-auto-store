import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import helpers from '../common/helpers.js';
import Permission from '../models/Permission.js';
import User from '../models/User.js';

const logIn = async (req, res) => {
    const { username, password } = req.body;
    User.belongsTo(Permission, { foreignKey: 'permission_id' });
    const user = await User.findOne({ 
        include: Permission, 
        where: { username: username }
    });
        
    if (!user) {
        return res.redirect('/login');
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
        return res.redirect('/login');
    }

    const payload = { 
        id: user.id, 
        username: user.username,
        role: user.Permission.role,
    };

    req.session.token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 3600 });
    req.session.user = user.username;
    req.session.role = user.Permission.role;
    helpers.user = () => user.username;
    return res.redirect('/');
};

const logOut = (req, res) => {
    delete req.session.token;
	return res.redirect('/');
};

export { logIn, logOut };