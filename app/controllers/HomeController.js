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

    req.session.token = jwt.sign(
        { id: user.id, username: username }, 
        process.env.JWT_KEY, 
        { expiresIn: 3600 }
    );
    
    req.session.user_id = user.id;
    req.session.grade = user.Permission.grade;
    helpers.user = () => user.username;
    
    return res.redirect('/');
};

const logOut = (req, res) => {
    delete req.session.token;
	return res.redirect('/');
};

export { logIn, logOut };