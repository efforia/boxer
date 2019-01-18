/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Merchant category routes.
 */

// --------------- Module Imports
const auth = require("../../utils/auth.service");
const MarsRouter = require("../../base/router");
const swaggerUtils = require("../../utils/swagger.utils");
const execute = require("../../utils/async");
const router = new MarsRouter("merchant");
const controller = require("./merchant.controller");

/**
 * @interface details
 * Gets merchant details by the _id.
 */
router.get("/:id/details", execute(async (req, res) => {
    let id = req.params.id;
    let merchant = await controller.details(id);
    return res.status(200).json(merchant);
})).describe({
    tags: [router.entity],
    operationId: "getMerchantById",
    parameters: [],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface details
 * Gets merchant details by the username.
 */
router.get("/by-username/:username", execute(async (req, res) => {
    let username = req.params.username;
    let merchant = await controller.details(undefined, username);
    return res.status(200).json(merchant);
})).describe({
    tags: [router.entity],
    operationId: "getMerchantByUsername",
    parameters: [],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface createPaymentsAccount
 * Creates an payment account for the merchant
 */
router.post('/account/payment', auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let account = await controller.createPaymentsAccount(user);
    return res.status(200).json(account);
})).describe({
    tags: [router.entity],
    operationId: "createMerchant",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam(),
    { "name": "user", "in": "body", "description": "JSON representation of the user.", "schema": { "type": "object" } }]
});

/**
 * @interface nearbyMerchants
 * Gets the nearby merchants for the given coordinates and keyword filter.
 */
router.get("/nearby", execute(async (req, res) => {
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let radius = req.query.radius;
    let keyword = req.query.keyword;
    let merchants = await controller.nearbyMerchants(latitude, longitude, radius, keyword);
    return res.status(200).json(merchants);
})).describe({
    tags: [router.entity],
    operationId: "getNearbyMerchants",
    parameters: [
        { "name": "latitude", "in": "query", "description": "Geolocation latitude value.", "type": "number", required: true },
        { "name": "longitude", "in": "query", "description": "Geolocation longitude value.", "type": "number", required: true },
        { "name": "radius", "in": "query", "description": "Maximum radius to search for (km).", "type": "number", required: false },
        { "name": "keyword", "in": "query", "description": "Geolocation keyword value.", "type": "string", required: false },
    ],
    responses: Object.assign(swaggerUtils.defaultResponses(), {
        200: { description: "Nearby merchants list from the database.\n returns []: Array of Merchant" },
    })
});

/**
 * @interface nearbyByService
 * Gets the nearby merchants for the given coordinates, keyword filter and provided service.
 */
router.get("/nearby/:service", execute(async (req, res) => {
    let service = req.params.service;
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let radius = req.query.radius;
    let keyword = req.query.keyword;
    let merchants = await controller.nearbyByService(service, latitude, longitude, radius, keyword);
    return res.status(200).json(merchants);

})).describe({
    tags: [router.entity],
    operationId: "getNearbyMerchantsByService",
    parameters: [
        { "name": "service", "in": "path", "description": "Requested service name.", "type": "string", "required": true },
        { "name": "latitude", "in": "query", "description": "Geolocation latitude value.", "type": "number", "required": true },
        { "name": "longitude", "in": "query", "description": "Geolocation longitude value.", "type": "number", "required": true },
        { "name": "keyword", "in": "query", "description": "Geolocation keyword value.", "type": "string", "required": false },
        { "name": "radius", "in": "query", "description": "Maximum radius to search for (km).", "type": "number", required: false },
    ],
    responses: Object.assign(swaggerUtils.defaultResponses(), {
        200: { description: "Nearby merchants list from the database.\n returns []: Array of Merchant" },
    })
});

module.exports = router;