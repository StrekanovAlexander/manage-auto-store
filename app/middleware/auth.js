import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        return res.redirect('/login');
    }
    const token = header.replace('Bearer ', '');
    try {
        jwt.verify(token, process.env.JWT_KEY);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.redirect('/login');
        }
    }
    next();
}