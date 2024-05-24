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

    const token = jwt.sign(user.username, process.env.JWT_KEY);
    // res.json( {token} );
    //return res.redirect('/');
}

export { logIn };