/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Chat controller.
 */

// --------------- Module Imports
var Message = require('./message.model');

// --------------- Module Controller
const ChatCtrl = module.exports = {
    getUserChats: async function(user) {
        let chats = await Message.aggregate([ // Group messages in chats
            { "$match": { "$or": [{ to: user }, { from: user }] } }, // Either sent from or to the user
            { "$group": { "_id": { from: "$from", to: "$to" } } } // Groups by the users ids
        ]);
        return chats;
    },
    getChatMessages: async function(user, chat) {
        let chatterOrGroup = chat; // Gets the chatter or message group id
        let byParticipants = { $and: [{ $or: [{ to: user }, { from: user }] }, { $or: [{ to: chatterOrGroup }, { from: chatterOrGroup }] }] }; // Sets query criteria
        let messages = await Message.find(byParticipants); // Finds messages
        return messages || []; // Returns messages or empty array
    }
}