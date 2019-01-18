/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Chart events.
 */

// --------------- Module Imports
const socket = require('../utils/socket.utils')();
const notification = require('../notification/notification.controller.js');
const Message = require('./message.model');

/**
 * @event "new message"
 * On new message received.
 */
socket.on('new message', async (message) => { // When there is an new message notification
    Message.create(message); // Stores the message on the database
});

/**
 * @event "afterInsert"
 * On DB message insertion.
 */
Message.on('afterInsert', async (created) => { // When a new message is created
    let message = await Message.findOne({ _id: created._id }).populate('from to'); // Retrieves message info
    message.to.forEach((user) => { socket.emit('new message', Object.assign({ room: message.to }, message)); }); // Informs the related users
    notification.send({ // Sends an notification with:
        title: message.from.name, // User name as title
        contents: message.contents, // Message contents
        to: [message.to], // Receivers
        data: { event: "new_message", message: message.contents } // Message payload
    });
});