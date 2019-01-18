/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Chart events.
 */

// --------------- Module Imports
const socket = require("../utils/socket.utils")();
const notification = require("../notification/notification.controller.js");
const Bid = require('./bid.model');

/**
 * @event "afterInsert"
 * On DB bid insertion.
 */
Bid.on("afterInsert", async (created) => { // When a new bid is created
    let bid = await Bid.findOne({ _id: created._id }).populate("customer merchant"); // Retrieves bid info
    console.log(bid);
});