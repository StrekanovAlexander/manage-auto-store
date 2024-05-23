import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const logIn = (req, res) => {
    const { email, password } = req.body;
    let user = {
        email: 'admin@admin.io',
        password: '$2a$12$pz8n51f/Gog7jF6q2YXvIuK1DhcLx2IjmOGxVxKIqPw38Q8r7XN3C'
    };
    
    if (!user) {
        return res.status(401).json('Not such user');
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
        return res.status(401).json('Wrong password');
    }
    const token = jwt.sign(user.email, process.env.JWT_KEY);
    res.json({ token });
}

export { logIn };