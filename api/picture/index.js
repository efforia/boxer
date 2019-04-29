/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Picture routes.
 */

// --------------- Module Imports
const auth = require("../utils/auth.service");
const MarsRouter = require("../base/router");
const swaggerUtils = require("../utils/swagger.utils");
const execute = require("../utils/async");
const router = new MarsRouter("picture");
const controller = require("./picture.controller");

router.post("/save", auth.isAuthenticated(), execute(async (req, res) => {
    let mimeType = req.body.mimeType;
    let sent = req.body.sent;
    let ownerId = req.user._id; // Gets the picture owner id
    let filename = req.files[0].originalname; // Gets the upload file name
    let file = req.files[0].buffer; // Gets the uploaded file path
    let picture = await controller.save(filename, file, ownerId, mimeType, sent);
    return res.status(200).json(picture);
})).describe({
    operationId: "addPicture",
    tags: [router.entity],
    consumes: ["multipart/form-data"],
    parameters: [swaggerUtils.authParam(), { "name": "files", "in": "formData", "type": "file", "description": "path of the file to update" }],
    responses: swaggerUtils.defaultResponses()
});

router.get("/:id", execute(async (req, res) => {
    let id = req.params.id;
    let picture = await controller.get(id);
    if (!picture) return res.status(404).send({}); // In case the picture is not found, returns a 404
    res.header("Content-Type", picture.mimeType); // Sets the response header
    return res.status(301).redirect(picture.externalRef); // And redirects to the file url
})).describe({
    tags: [router.entity],
    operationId: "getPicture",
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});

router.get("/:itemId", execute(async (req, res) => {
    let itemId = req.params.itemId();
    let picture = await controller.getLatest(itemId);
    if (!picture) return res.status(404).send({}); // In case it is not found, returns a 404
    res.header("Content-Type", picture.mimeType); // Sets the response header
    return res.status(301).redirect(picture.externalRef); // And redirects to the file url
})).describe({
    tags: [router.entity],
    operationId: "getLatest",
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});

router.post("/remove/:id", auth.isAuthenticated(), execute(async (req, res) => {
    let id = req.params.id;
    let ownerId = req.user._id;
    let removed = await controller.remove(id, ownerId);
    return res.status(200).json(removed);
})).describe({
    tags: [router.entity],
    operationId: "removePicture",
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});


module.exports = router;
