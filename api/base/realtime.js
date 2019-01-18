/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const socket = require('../utils/socket.utils')();
const User = require('./user.model');
const entity = "User";
const eventFor = (hook) => {
    return `mars_${entity}_${hook}`;
};

module.exports = {
    register: () => {
        User.schema.post('save', (error, doc, next) => {
            socket.emit(eventFor('save'), doc);
            next();
        });
        return this;
    }
};