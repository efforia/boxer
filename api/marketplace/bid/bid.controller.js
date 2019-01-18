/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Bid controller.
 */

// --------------- Module Imports
const Order = require("../order/order.model");
const Bid = require("./bid.model");

// --------------- Module Controller
const BidCtrl = module.exports = {
    getUserBids: async function (user) {
        let bids = await Bid.aggregate([ // Group bids in bids
            { "$match": { "user": user } }, // Either sent from or to the user
            { "$group": { "_id": { order: "$order" } } } // Groups by the users ids
        ]);
        return bids;
    },
    placeBid: async function (user, order, bid, final) {
        bid.order = order; // Sets order reference on the bid
        bid.user = user; // Sets user reference on the bid
        let createdBid = await Bid.create(bid); // Creates bid
        let updatedOrder = await Order.findOneAndUpdate({ _id: order }, { $push: { bids: createdBid } }, { new: true }).populate("bids bids.user"); // Adds bid to the order
        if (final) Order.findOneAndUpdate({ _id: order }, { status: "accepted" }); // Closed the order for new bids
        let bids = await BidCtrl.getOrderBids(order);
        return bids; // Returns updated order
    },
    getOrderBids: async function (orderId) {
        let bids = await Bid.find({ order: orderId }).populate("user").lean(); // Finds bids
        return bids || []; // Returns bids or empty array
    }
}