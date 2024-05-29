import { setMessage } from './message.js';

const high = (req) => req.session.grade === 'xx';
const middle = (req) => req.session.grade === 'x0';
const low = (req) => req.session.grade === '00';

const attempt = (req, res, isGrade, rout) => {
    if (!isGrade(req)) {
        setMessage(req, `Недостаточно прав`, 'danger');
        return res.redirect(rout);
    }
};

export default { attempt, high, middle, low };