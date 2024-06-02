import Participant from '../models/Participant.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    const participants = await Participant.findAll({ order: [['full_name']] });
    res.render('participants', { 
        title: 'Участники операций',
        participants,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/participants', 'Участники операций')
        ])
    });
}

const create = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/participants');
    }

    res.render('participants/create', { 
        title: 'Создание участника операций',
        validator: scriptPath('validators/participant/participant-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/participants', 'Участники операций'),
            breadcrumb.make('#', 'Создание....'),
        ])
    });
}

const store = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/participants');
    }

    await Participant.create(req.body);
    setMessage(req, `Участник операции был создан`, 'success');
    res.redirect('/participants');
}

const edit = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/participants');
    }
    const { id } = req.params;
    const participant = await Participant.findByPk(id);

    res.render('participants/edit', {
        title: `Редактирование участника операций "${ participant.full_name }"`,
        participant: participant.dataValues,
        validator: scriptPath('validators/participant/participant-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/participants', 'Участники операций'),
            breadcrumb.make('#', participant.full_name),
            breadcrumb.make('#', 'Редактирование...'),
        ])
    });
}

const update = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/participants');
    }
    const { id, full_name, activity } = req.body;

    await Participant.update({ full_name, activity: activity === 'on' ? true : false }, { where: { id } });
    setMessage(req, `Участник операций был отредактирован`, 'success');
    res.redirect('/participants');
}

export default { all, create, store, edit, update };