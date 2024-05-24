import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    if (!req.session.token) {
        return res.redirect('/login');
    }
    try {
        jwt.verify(req.session.token, process.env.JWT_KEY);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.redirect('/login');
        }
    }
    next();
}