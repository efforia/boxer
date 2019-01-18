/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Customer controller.
 */

// --------------- Module Imports
const Customer = require("../customer/customer.model");

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
    }
};