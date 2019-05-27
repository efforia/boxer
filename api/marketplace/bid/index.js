/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Bid routes.
 */

// --------------- Module Imports
const auth = require("../../utils/auth.service");
const swaggerUtils = require("../../utils/swagger.utils");
const execute = require("../../utils/async");
const MarsRouter = require("../../base/router");

const router = new MarsRouter("bid");
const controller = require("./bid.controller");
const bid = require("./bid.model").schema.jsonSchema();


/**
 * @interface placeBid
 * Get bid bids.
 */
router.post("/:order/place", auth.hasValidToken(), execute(async (req, res) => {
    let user = req.user;
    let bid = req.body;
    let order = req.params.order;
    let bids = await controller.placeBid(user, order, bid, false);
    return res.status(200).json(bids);
})).describe({
    tags: [router.entity],
    operationId: "placeBid",
    responses: swaggerUtils.defaultResponses(),
    parameters: [
        swaggerUtils.authParam(),
        { "name": "bid", "in": "body", "description": "JSON representation of the bid.", "schema": bid }
    ]
});

/**
 * @interface placeFinalBid
 * Get bid bids.
 */
router.post("/:order/final", auth.hasValidToken(), execute(async (req, res) => {
    let user = req.user;
    let bid = req.body;
    let order = req.params.order;
    let bids = await controller.placeBid(user, order, bid, true);
    return res.status(200).json(bids);
})).describe({
    tags: [router.entity],
    operationId: "placeFinalBid",
    responses: swaggerUtils.defaultResponses(),
    parameters: [
        swaggerUtils.authParam(),
        { "name": "bid", "in": "body", "description": "JSON representation of the bid.", "schema": bid }
    ]
});

/**
 * @interface getBid
 * Get bid bids.
 */
router.get("/by-order/:order", execute(async (req, res) => {
    let bids = await controller.getOrderBids(req.params.order);
    return res.status(200).json(bids);
})).describe({
    tags: [router.entity],
    operationId: "getOrderBids",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()]
});


module.exports = router;
