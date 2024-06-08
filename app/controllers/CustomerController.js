import { Op } from 'sequelize';
import Customer from '../models/Customer.js';
import access from '../common/access.js';
import breadcrumb from '../common/breadcrumb.js';
import scriptPath from '../common/script-path.js';
import { message, setMessage } from '../common/message.js';

const all = async (req, res) => {
    const customers = await Customer.findAll();
    res.render('customers', { 
        title: 'Customers',
        customers,
        access: access.high(req),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/customers', 'Customers')
        ])
     });
}

const create = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/customers');
    }
    res.render('customers/create', { 
        title: '',
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/customers', 'Customers'),
            breadcrumb.make('#', ''),
        ])
    });
}

const store = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/customers');
    }
    const { title } = req.body;
    const customer = await Customer.findOne({ where: { title: title.trim() } });
    if (customer) {
        setMessage(req, ` ${title} `, 'danger');
        return res.redirect('/customers/create');
    }
    
    await Customer.create({ title });
    setMessage(req, ` ${title} `, 'success');
    res.redirect('/customers');
}

const edit = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/customers');
    }
    const { id } = req.params;
    const customer = await Customer.findOne({ where: { id } });

    res.render('customers/edit', {
        title: `Customer "${ customer.title }" editing`,
        customer: customer.dataValues,
        validator: scriptPath('validators/single/single-edit.js'),
        msg: message(req),
        breadcrumb: breadcrumb.build([
            breadcrumb.make('/customers', 'Customers'),
            breadcrumb.make('#', customer.title),
            breadcrumb.make('#', 'Edit...'),
        ])
    });
}

const update = async (req, res) => {
    if (!access.isAllow(req, access.high)) {
        return res.redirect('/customers');
    }
    const { id, title, activity: _activity } = req.body;
    let customer = await Customer.findOne({ where: { id: { [Op.ne]: id }, title: title } });
    if (customer) {
        setMessage(req, `Customer ${ title } already exits `, 'danger');
        return res.redirect(`/customers/${ id }/edit`);    
    }
    
    customer = await Customer.findOne({ where: { id } });
    const activity = customer.is_main ? true : (_activity === 'on' ? true : false);      

    await Customer.update({ title, activity }, { where: { id } });
    setMessage(req, `Custimer was edite`, 'success');

    res.redirect('/customers');
}

export default { all, create, store, edit, update };