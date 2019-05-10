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
const router = new MarsRouter("order");
const controller = require("./order.controller");
const order = require("./order.model").schema.jsonSchema();

/**
 * @interface createOrder
 * Creates an order.
 */
router.post("/", auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let orderInfo = req.body;
    let order = await controller.create(user, orderInfo);
    return res.status(200).json(order);
})).describe({
    tags: [router.entity],
    operationId: "createOrder",
    parameters: [
        swaggerUtils.authParam(),
        { "name": "order", "in": "body", "description": `JSON representation of the ${router.entity} to be created.`, "schema": order },
    ],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface getReadyOrders
 * Lists all ready orders on system.
 */
router.get("/ready", auth.isAuthenticated(), execute(async (req, res) => {
  let orders = await controller.readyOrders();
  return res.status(200).json(orders);
})).describe({
    tags: [router.entity],
    operationId: "getReadyOrders",
    parameters: [
        swaggerUtils.authParam()
    ],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface getOrdersByUserId
 * Lists orders based on user id.
 */
router.get("/", auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let status = req.query.status;
    let orders = await controller.getOrdersByUserId(user, status);
    return res.status(200).json(orders);
})).describe({
    tags: [router.entity],
    operationId: "getOrders",
    parameters: [
        swaggerUtils.authParam(),
        { "name": "status", "in": "query", "description": "Filtering status.", "type": "string" },
    ],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface getOrdersByDatesAndUserId
 * Lists orders based on user id and time period.
 */
router.get("/between-dates", auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let status = req.query.status;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let orders = await controller.getOrdersByDatesAndUserId(user, startDate, endDate, status);
    return res.status(200).json(orders);
})).describe({
    tags: [router.entity],
    operationId: "getOrdersByPeriod",
    parameters: [
        swaggerUtils.authParam(),
        { "name": "status", "in": "query", "description": "Filtering status.", "type": "string" },
        { "name": "startDate", "in": "query", "description": "Filtering start date.", "type": "string" },
        { "name": "endDate", "in": "query", "description": "Filtering end date.", "type": "string" }
    ],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface getOrder
 * Retrieves order information.
 */
router.get("/:id", auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let id = req.params.id;
    let order = await controller.getById(user, id);
    return res.status(200).json(order);
})).describe({
    tags: [router.entity],
    operationId: "getOrder",
    parameters: [swaggerUtils.authParam()],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface acceptOrder
 * Updates order status to accepted and executes the necessary operations.
 */
router.post("/:id/accept", auth.isMerchant(), execute(async (req, res) => {
    let user = req.user;
    let id = req.params.id;
    let accepted = await controller.accept(user, id);
    return res.status(200).json(accepted);
})).describe({
    tags: [router.entity],
    operationId: "acceptOrder",
    parameters: [swaggerUtils.authParam()],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface cancelOrder
 * Updates order status to cancelled and executes the necessary operations.
 */
router.get("/:id/cancel", auth.isAuthenticated(), execute(async (req, res) => {
    let id = req.params.id;
    let canceled = await controller.cancel(id);
    return res.status(200).json(canceled);
})).describe({
    tags: [router.entity],
    operationId: "cancelOrder",
    parameters: [swaggerUtils.authParam()],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface rateOrder
 * Adds rating information to the order.
 */
router.post("/:id/rate/:rate", auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let id = req.params.id;
    let rate = req.params.id;
    let updated = await controller.rate(user, id, rate);
    return res.status(200).json(updated);
})).describe({
    tags: [router.entity],
    operationId: "rateOrder",
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});

/**
 * @interface listReceivingModes
 * List order receiving modes.
 */
router.get("/receiving-modes", execute(async (req, res) => {
    let receivingModes = await controller.listReceivingModes();
    return res.status(200).json(receivingModes);
})).describe({
    tags: [router.entity],
    operationId: "getReceivingModes",
    parameters: [],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface listPaymentModes
 * List order receiving modes.
 */
router.get("/payment-modes/list", execute(async (req, res) => {
    let paymentModes = await controller.listPaymentModes();
    return res.status(200).json(paymentModes);
})).describe({
    tags: [router.entity],
    operationId: "getPaymentModes",
    parameters: [],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

/**
 * @interface getOrdersNearby
 * List orders nearby.
 */
router.get("/by-location/nearby", execute(async (req, res) => {
    let latitude = parseFloat(req.query.latitude || 0);
    let longitude = parseFloat(req.query.longitude || 0);
    let radius = req.query.radius || 100000;
    let keyword = req.query.keyword;
    let events = await controller.getNearby(latitude, longitude, radius, keyword);
    return res.status(200).json(events);
})).describe({
    operationId: "getOrdersNearby",
    tags: [router.entity],
    parameters: [
        { "name": "latitude", "in": "query", "description": "Geolocation latitude value.", "type": "number", required: true },
        { "name": "longitude", "in": "query", "description": "Geolocation longitude value.", "type": "number", required: true },
        { "name": "radius", "in": "query", "description": "Maximum radius to search for (km).", "type": "number", required: false },
        { "name": "keyword", "in": "query", "description": "Geolocation keyword value.", "type": "string", "required": false },
        { "name": "page", "in": "query", "description": "Number of pages to skip.", "type": "number", "required": true },
        { "name": "pageSize", "in": "query", "description": "Size of documents on one page.", "type": "number", "required": false }
    ],
    responses: swaggerUtils.defaultResponses()
});

/**
 * @interface set
 * Updates order status to started and executes the necessary operations.
 */
router.post("/:id/merchant/:merchant", auth.isAuthenticated(), execute(async (req, res) => {
    let order = req.params.id;
    let merchant = req.params.merchant;
    let updated = await controller.setMerchant(order, merchant);
    return res.status(200).json(updated);
})).describe({
    operationId: "setOrderMerchant",
    tags: [router.entity],
    parameters: [swaggerUtils.authParam()],
    responses: swaggerUtils.defaultResponses()
});

/**
 * @interface startOrder
 * Updates order status to started and executes the necessary operations.
 */
router.post("/:id/start", auth.isMerchant(), execute(async (req, res) => {
    let user = req.user;
    let id = req.params.id;
    let started = await controller.startOrder(id);
    return res.status(200).json(started);
})).describe({
    tags: [router.entity],
    operationId: "startOrder",
    parameters: [swaggerUtils.authParam()],
    responses: Object.assign(swaggerUtils.defaultResponses())
});


module.exports = router;
