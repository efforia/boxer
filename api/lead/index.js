/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Lead routes.
 */

// --------------- Module Imports
const auth = require("../utils/auth.service");
const MarsRouter = require("../base/router");
const swaggerUtils = require("../utils/swagger.utils");
const execute = require("../utils/async");
const router = new MarsRouter("lead");
const controller = require("./lead.controller");

router.post("/", execute(async (req, res) => {
    let lead = req.body;
    let saved = await controller.save(lead);
    return res.status(200).json(saved);
})).describe({
    operationId: "addLead",
    tags: [router.entity],
    parameters: [
        { "name": "lead", "in": "body", "description": "JSON representation of the lead.", "schema": { "type": "object" } }
    ],
    responses: swaggerUtils.defaultResponses()
});

router.get("/", auth.isAuthenticated(), execute(async (req, res) => {
    let leads = await controller.list();
    return res.status(200).redirect(leads);
})).describe({
    tags: [router.entity],
    operationId: "getLeads",
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});

router.get("/:id", auth.isAuthenticated(), execute(async (req, res) => {
    let id = req.params.id;
    let leads = await controller.get(id);
    return res.status(200).redirect(leads);
})).describe({
    tags: [router.entity],
    operationId: "getLead",
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});


module.exports = router;