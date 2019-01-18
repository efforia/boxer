/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Notification routes.
 */

// --------------- Module Imports
const auth = require("../utils/auth.service");
const MarsRouter = require("../base/router");
const swaggerUtils = require("../utils/swagger.utils");
const execute = require("../utils/async");
const router = new MarsRouter("notification");
const controller = require("./notification.controller");

router.post("/send", auth.isAdmin(), execute(async (req, res) => {
    let notificationInfo = req.body;
    let notification = await controller.sendNotification(notificationInfo);
    return res.status(200).json(notification);
})).describe({
    operationId: "sendNotification",
    tags: [router.entity],
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});

router.get("/", auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let notifications = await controller.getForUser(user);
    return res.status(200).json(notifications);
})).describe({
    tags: [router.entity],
    operationId: "getNotifications",
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});

router.get("/:id", auth.isAuthenticated(), execute(async (req, res) => {
    let id = req.params.id;
    let notification = await controller.getById(id);
    return res.status(200).json(notification);
})).describe({
    tags: [router.entity],
    operationId: "getNotification",
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});

module.exports = router;