/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Chat routes.
 */

// --------------- Module Imports
const auth = require("../utils/auth.service");
const swaggerUtils = require("../utils/swagger.utils");
const execute = require("../utils/async");
const MarsRouter = require("../base/router");

const router = new MarsRouter("chat");
const controller = require("./chat.controller");

/**
 * @interface getUserChats
 * Gets all user chats.
 */
router.get('/chats', auth.isAuthenticated(), execute(async (req, res) => {
    let chats = await controller.getUserChats({ _id: req.user._id });
    return res.status(200).json(chats);
})).describe({
    tags: [router.entity],
    operationId: "getChats",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()],
});

/**
 * @interface getChat
 * Get chat messages.
 */
router.get('/:chat', execute(async (req, res) => {
    let messages = await controller.getChatMessages(req.params.user, req.params.chat);
    return res.status(200).json(messages);
})).describe({
    tags: [router.entity],
    operationId: "getChat",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()]
});

module.exports = router;