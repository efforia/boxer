/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description User routes.
 */

// --------------- Module Imports
const auth = require("../utils/auth.service");
const MarsRouter = require("../base/router");
const swaggerUtils = require("../utils/swagger.utils");
const execute = require("../utils/async");
const router = new MarsRouter("user");
const controller = require("./user.controller");

// --------------- Module Controller
router.post("/create", execute(async (req, res) => {
    let userInfo = req.body;
    let created = await controller.create(userInfo);
    return res.status(200).json(created);
})).describe({
    tags: [router.entity],
    operationId: "createUser",
    responses: swaggerUtils.defaultResponses(),
    parameters: [
        { "name": "user", "in": "body", "description": "JSON representation of the user to be created.", "schema": { "type": "object" } },
    ]
});

router.get("/username/exists/:username", execute(async (req, res) => {
    let username = req.params.username;
    let isUnique = await controller.isUniqueUsername(username);
    return res.status(200).json(isUnique);
})).describe({
    tags: [router.entity],
    operationId: "isUniqueUsername",
    responses: swaggerUtils.defaultResponses(),
    parameters: []
});

router.get("/profile", auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let profile = await controller.get(user);
    return res.status(200).json(profile);
})).describe({
    tags: [router.entity],
    operationId: "getUserProfile",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()]
});

router.post("/authenticate", auth.passwordIsValid(), execute(async (req, res) => {
    let username = req.body.email;
    let authenticated = await controller.authenticate(username);
    return res.status(200).json(authenticated);
})).describe({
    tags: [router.entity],
    operationId: "authenticateUser",
    responses: swaggerUtils.defaultResponses(),
    parameters: [
        swaggerUtils.bodyParam("user", "User credentials object.", {
            type: "object",
            properties: { "email": { type: "string" }, "password": { type: "string" } },
            required: ["email", "password"]
        })
    ]
});

router.post("/update", auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let updates = req.body;
    let updated = await controller.update(user, updates);
    return res.status(200).json(updated);
})).describe({
    tags: [router.entity],
    operationId: "updateUser",
    responses: swaggerUtils.defaultResponses(),
    parameters: [
        swaggerUtils.authParam(),
        { "name": "user", "in": "body", "description": "JSON representation of the user to be created.", "schema": { "type": "object" } },
    ]
});

router.post("/password/recover/:email", execute(async (req, res) => {
    let email = req.params.email;
    let confirmation = await controller.recoverPassword(email);
    return res.status(200).json(confirmation);
})).describe({
    tags: [router.entity],
    operationId: "recoverPassword",
    responses: swaggerUtils.defaultResponses(),
    parameters: []
});

router.post("/password/update", auth.isAuthenticated(), auth.passwordIsValid(), execute(async (req, res) => {
    let user = req.user;
    let newPassword = req.body.newPassword;
    let updated = await controller.updatePassword(user, newPassword);
    return res.status(200).json(updated);
})).describe({
    tags: [router.entity],
    operationId: "updatePassword",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam(),
    swaggerUtils.bodyParam("user", "User credentials object.", {
        type: "object",
        properties: {
            "password": { type: "string" },
            "newPassword": { type: "string" }
        },
        required: ["password", "newPassword"]
    })]
});

router.post("/skips/:skip", auth.isAuthenticated(), execute(async (req, res) => {
    let userId = req.user._id;
    let skip = req.params.skip;
    let skipAdded = await controller.addSkip(userId, skip);
    return res.status(200).json(skipAdded);
})).describe({
    tags: [router.entity],
    operationId: "addSkip",
    responses: swaggerUtils.defaultResponses(),
    parameters: [
        swaggerUtils.authParam(),
        { "name": "skip", "in": "path", "description": "User step in order to skip.", "type": "string", "required": true },
    ]
});


module.exports = router;

/* router.post("/email/verify/:confirmation", execute(controller.confirmEmail)).describe({
    tags: [router.entity],
    operationId: "confirmUserEmail",
    responses: swaggerUtils.defaultResponses(),
    parameters: [
        { "name": "confirmation", "in": "path", "description": "Confirmation hash sent to the user email.", "type": "string", "required": true },
    ]
}); */