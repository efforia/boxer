/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Customer controller.
 */

// --------------- Module Imports
const Customer = require("../customer/customer.model");
const Order = require("../order/order.model");

// --------------- Module Controller
const CustomerCtrl = module.exports = {
    addFavorite: async function (user, merchant) {
        let favorites = (await Customer.findOneAndUpdate({ _id: user._id }, { $addToSet: { favoriteMerchants: merchant } }, { upsert: true, new: true }) // Adds it to the favorites list
            .populate("favoriteMerchants")).favoriteMerchants; // Populates the favorites list
        return favorites; // Returns the updated list
    },

    removeFavorite: async function (user, merchant) {
        let favorites = (await Customer.findOneAndUpdate({ _id: user._id }, { $pull: { favoriteMerchants: merchant } }, { new: true }) // Adds it to the favorites list
            .populate("favoriteMerchants")).favoriteMerchants; // Populates the favorites list
        return favorites; // Returns the updated list
    },

    getFavorites: async function (user) {
        let favorites = (await Customer.findOne({ _id: user._id })).favoriteMerchants; // Gets the favorites list
        return favorites; // Returns the list
    },

    updateRating: async function (id) {
        let orders = await (Order.find({ customer: id, merchantRate: { $ne: null } }, '-_id merchantRate')); // Gets merchant orders
        let ratingsTotal = 0; // Initializes rating count
        orders.map((order) => { ratingsTotal += order.merchantRate; }); // Calculates the rating amount
        let rating = (ratingsTotal / orders.length); // Divides it by the ratings number
        let customer = await Customer.findOneAndUpdate({ _id: id }, { rating: rating }); // Updates it on the the merchant
        return customer; // Returns the updated merchant
    }
};
