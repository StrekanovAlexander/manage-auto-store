import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const logIn = (req, res) => {
    const { username, password } = req.body;
    let user = {
        username: 'admin',
        password: '$2a$12$pz8n51f/Gog7jF6q2YXvIuK1DhcLx2IjmOGxVxKIqPw38Q8r7XN3C'
    };

    if (!user) {
        return res.redirect('/login');
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
        return res.redirect('/login');
    }

    req.session.token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: 3600 });
    return res.redirect('/');
};

const logOut = (req, res) => {
    delete req.session.token;
	return res.redirect('/');
};

export { logIn, logOut };