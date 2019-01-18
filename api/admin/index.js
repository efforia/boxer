/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Admin routes.
 */

// --------------- Module Imports
const auth = require("../utils/auth.service");
const swaggerUtils = require("../utils/swagger.utils");
const execute = require("../utils/async");
const MarsRouter = require("../base/router");
const router = new MarsRouter("admin");
const controller = require("./admin.controller");


/**
 * @interface listUsers
 * Lists users including the deleted ones.
 */
router.get("/users", auth.isAdmin(), execute(async (req, res) => {
    let page = parseInt(req.query.page || 1); // Parses the page
    let pageSize = parseInt(req.query.pageSize || 5); // Parses the page size
    let keyword = req.query.keyword || ""; // Parses the filtering keyword
    let role = req.query.role;
    let user = req.user._id;
    let users = await controller.listUsers(user, role, keyword, page, pageSize);
    return res.status(200).json(users);
})).describe({
    tags: [router.entity],
    operationId: "getUsersAsAdmin",
    responses: swaggerUtils.defaultResponses(),
    parameters: [
        swaggerUtils.authParam(),
        { "name": "role", "in": "query", "description": "Desired role.", "type": "string", "required": true },
        { "name": "keyword", "in": "query", "description": "Filtering keyword.", "type": "string", "required": true },
        { "name": "page", "in": "query", "description": "Number of pages to skip.", "type": "number", "required": true },
        { "name": "pageSize", "in": "query", "description": "Size of documents on one page.", "type": "number", "required": false }
    ]
});

/**
 * @interface deactivateUser
 * Performs logic exclusion on the user.
 */
router.post("/users/:id", auth.isAdmin(), execute(async (req, res) => {
    let id = req.params.id;
    let deactivated = await controller.deactivateUser(id);
    return res.status(200).json(deactivated);
})).describe({
    tags: [router.entity],
    operationId: "deactivateUserAsAdmin",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()]
});

/**
 * @interface activateUser
 * Performs logic activation on the user.
 */
router.post("/users/:id/activate", auth.isAdmin(), execute(async (req, res) => {
    let id = req.params.id;
    let activated = controller.activateUser(id);
    return res.status(200).json(activated);
})).describe({
    tags: [router.entity],
    operationId: "activateUserAsAdmin",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()]
});

/**
 * @interface changeUserRole
 * Changes user role.
 */
router.post("/users/:id/role/:role", auth.isAdmin(), execute(async (req, res) => {
    let role = req.params.role; // Parses the role
    let id = req.params.id;
    let updated = await controller.changeUserRole(id, role);
    return res.status(200).json(updated);
})).describe({
    tags: [router.entity],
    operationId: "changeUserRole",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()]
});

module.exports = router;